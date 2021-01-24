import bcrypt from "bcrypt";
import db from "../models";
import generic from "../helpers/Generic";
import notification from "../helpers/Notification";
import jwt from "jsonwebtoken";
import { UniqueConstraintError } from "sequelize";
const saltRounds = 10;

export default class UserController {
  static async getUsersList(req, res, next) {
    await db["User"].findAll({
      attributes: ["id", "firstName", "lastName", "email", "jobTitle", "role", "companyId", "status", "lastActivity", "createdAt"],
      order: [["createdAt", "DESC"]]
    }).then((users) => {
      res.status(200).send({ result: users });
    }).catch((err) => {
      console.log(err);
      return res.status(401).send({ message: "list of users not got" });
    });
  }

  static async getUserProfile(req, res) {
    await db["User"].findOne({
      where: { id: req.user.id }, attributes: { exclude: ["password", "companyId", "resetLink", "lastActivity"] }
    }).then((user) => {
      res.status(200).send({ result: user });
    }).catch((err) => {
      console.log(err);
      return res.status(401).send({ message: "Profile not got" });
    });
  }

  static async register(req, res) {
    try {
      await db.sequelize.transaction(async (t) => {
        await db["Company"].create({
          coName: req.body.coName, coType: req.body.coType, coWebsite: req.body.coWebsite,
          districtBasedIn: req.body.districtBasedIn, businessActivityId: req.body.businessActivityId,
          shortDescription: req.body.shortDescription, slug: generic.generateSlug(req.body.coName),
          contactEmail: req.body.email, emailDisplay: false, status: "pending"
        }, { transaction: t })
          .then((company) => {

            db["ActivitiesOfCompany"].create({
              activityId: req.body.businessActivityId, companyId: company.id
            }, { transaction: t });

            const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
            const token = jwt.sign({ _id: req.body.email }, process.env.ACCOUNT_ACTIVATION_KEY, {});

            db["User"].create({
              firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email,
              jobTitle: req.body.jobTitle, password: hashPassword, role: req.body.role,
              resetLink: token, companyId: company.id, status: "pending"
            }, { transaction: t })
              .then((user) => {

                const parameters = { firstName: user.firstName, lastName: user.lastName, email: user.email, token: token }
                notification.notify("registration", parameters, function (response) {
                  return res.status(200).json({ message: response });
                });
              }).catch((error) => {

                if (error instanceof UniqueConstraintError) {
                  return res.status(409).send({
                    error:
                      "Email already used for a company on the system, Please use a different email",
                    field: error.errors[0].path
                  });
                }
                return res.status(401).send({ message: "Please confirm you provided all required info then try again" });
              });
          })
          .catch((error) => {

            if (error instanceof UniqueConstraintError) {
              return res.status(409).send({
                error: "The company is already registered on the system",
                field: error.errors[0].path
              });
            }
            return res.status(401).send({
              message:
                "Please confirm you provided all required info then try again"
            });
          });
      });
    } catch (error) {
      
      return res.status(401).send({ error: "Error occurred" });
    }
  }

  static async createUser(req, res) 
  {
    try {
      const hashPassword = bcrypt.hashSync(req.body.password.trim(), saltRounds);

      const user = await db["User"].create({
        firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email.trim(), 
        password: hashPassword, role: req.body.role, status: "active"
      });

      notification.notify("admin account creation",
      { firstName: user.firstName, lastName: user.lastName, email: user.email, password: req.body.password},
      function (response) {
        return res.status(200).json({ message: "User Account created successfully. " + response });
      });
    } catch (error) {
      console.log(error)
      if (error instanceof UniqueConstraintError) {
        return res.status(409).send({
          error:
            "User with this email already exists",
          field: error.errors[0].path,
        });
      }
      return res.status(400).send({ message: "Error occurred, Please try again later" });
    }
  }

  static async login(req, res, next) 
  {
    await db["User"].findOne({
      where: { email: req.body.email.trim() }
    }).then((user) => {

      if (!user) {
        return res.status(403).send({ message: "Invalid email or Account not activated, check your email" });
      }
      if (user.status != "active") {
        return res.status(403).send({ message: "You haven't activated your account, or the account is not active; please check email for activation link" });
      }
      if (!user.lastActivity && user.role == "normal") {
        notification.notify("first login",
          { firstName: user.firstName, lastName: user.lastName, companyId: user.companyId },
          function (response) {});
      }
      user.update({ lastActivity: db.sequelize.fn("NOW") });
      bcrypt.compare(req.body.password, user.password, function (error, result) {
        if (result) {
          db["Company"].findOne({
            where: { id: user.companyId },
          }).then((company) => {
            delete user.dataValues.password;
            res.locals.user = user;
            if (!company) {
              res.locals.companyInfo = "Company info not there";
            } else {
              res.locals.companyInfo = company;
            }
            next();
          }).catch((err) => {
            res.status(403).send({ message: "Error - company info not got" });
          });
        } else {
          console.log(error)
          res.status(403).send({ message: "Wrong Password" });
        }
      });
    }).catch((errr) => {
      console.log("err", errr)
      res.status(401).send({ message: "Error occurred" });
    });
  }

  static async changePassword(req, res) {
    try {
      bcrypt.hash(
        req.body.password,
        saltRounds,
        function (err, hashPassword) {
          if (hashPassword) {
            const response = db['User']
              .update(
                { password: hashPassword },
                {
                  where: {
                    email: req.body.email,
                  },
                }
              );
            return res.status(200).json({
              message: response
            })
          } else {
            return res.status(200).json({
              message: "Sorry, change of password failed."
            })
          }
        });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, change of password failed." });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;

    await db["User"].findOne({ where: { email: email } }).then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User with this email does not exist" });
      } else {
        const token = jwt.sign({ _id: user.id }, process.env.RESET_PASSWORD_KEY, { expiresIn: "1h" });

        if (token) {
          user.update({ resetLink: token }).then(result => {
            if (result) {
              notification.notify("forgot password", { firstName: user.firstName, lastName: user.lastName, email: user.email, token: token }, function (response) {
                return res.status(200).json({ message: response });
              });
            } else {
                return res.status(404).send({ message: "Please try again" });
              }
          }).catch(error => {
            return res.status(400).json({ error: "Please confirm that the email is right, Try again later" });
          });
        } else {
          return res.status(400).json({ error: "Please try again later" });
        }
      }
    }).catch(error => {
      return res.status(400).json({ error: "Please try again later" });
    })
  }

  static async resetPassword(req, res) {
    const { resetLink } = req.params;
    const { newPassword } = req.body;

    if (resetLink) {
      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "Incorrect token or The link expired" });
        } else {
          var user = db["User"].findOne({ where: { resetLink: resetLink } });

          if (!user) {
            return res.status(400).json({ error: "User with that link does not exist" });
          } else {
            bcrypt.hash(newPassword, saltRounds, function (err, hashPassword) {
              if (hashPassword) {
                const response = db['User'].update({ password: hashPassword, resetLink: null }, { where: { resetLink: resetLink } });
                
                if (response) {
                  return res.status(200).send({ message: "password reset" });
                } else {
                  return res.status(404).send({ message: "reset failed" });
                }
              } else {
                return res.status(401).json({ message: "Sorry, change of password failed." })
              }
            });
          }
        }
      });
    } else {
      return res.status(401).json({ error: "Authentication Error" });
    }
  }

  static async deactivateUser(req, res) {
    try {
      const response = await db['User']
        .update(
          { status: "inactive" },
          {
            where: {
              email: req.params.email,
            },
          }
        );
      return response
        ? res.status(200).json({
          message: "User deactivated successfully"
        })
        : res.status(404).json({
          error: "Sorry, deactivation failed..Try again"
        });
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Action failed" });
    }
  }

  static async activateUser(req, res) {
    try {
      const response = await db['User']
        .update(
          { status: "active" },
          {
            where: {
              email: req.params.email,
            },
          }
        );
      return response
        ? res.status(200).json({
          message: "User Account activated successfully"
        })
        : res.status(404).json({
          error: "Sorry, activation failed..Try again"
        });
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Action failed" });
    }
  }

  static async activateAccount(req, res) {
    try {
      const { activationLink } = req.params;
      if (activationLink) {
        jwt.verify(activationLink, process.env.ACCOUNT_ACTIVATION_KEY, (error, decoded) => {
          if (error) {
            return res.status(401).send({
              message: "Incorrect link or The link expired",
            });
          }
        });

        await db["User"].findOne({
          where: { resetLink: activationLink }, attributes: ["id", "email"]
        }).then((user) => {
          if (!user) {
            return res.status(400).json({ error: "Your account is already activated" });
          } else {
            user.update({ status: "active", resetLink: null });
            notification.notify("account activation", { email: user.email }, function (response) {
              return res.status(200).json({ message: response });
            });
          }
        }).catch((errr) => {
          console.log(errr)
          return res.status(401).json({ error: "Activation Error, try later" });
        });
      } else {
        return res.status(401).json({ error: "Activation Link not privided" });
      }
    } catch (err) {
      return res.status(400).json({ error: "Activation Error" });
    }
  }

  static async changeRole(req, res) {
    try {
      const response = await db['User'].update(
          { role: req.body.role }, { where: { id: req.params.userId } });
      return response ? res.status(200).json({ message: "User's role changed successfully" })
                      : res.status(404).json({ error: "Sorry, role change failed..Try again" });
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, role change failed..Try again" });
    }
  }

  static async searchForUsers(req, res) {
    try {
      const likeOp = db.Op.iLike;
      const searchValue = req.query.searchValue.trim();

      const messages = await db['User']
        .findAll({
          where: {
            [db.Op.or]: [
              { firstName: { [likeOp]: "%" + searchValue + "%" } },
              { lastName: { [likeOp]: "%" + searchValue + "%" } },
              { email: { [likeOp]: "%" + searchValue + "%" } },
              { jobTitle: { [likeOp]: "%" + searchValue + "%" } },
              { role: { [likeOp]: "%" + searchValue + "%" } }
            ],
          },
          attributes: {
            exclude: ["password", "resetLink"],
          },
          limit: 10,
          order: [['createdAt', 'DESC']]
        });

      if (messages && messages.length > 0) {
        return res.status(200).json({
          result: messages,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Message found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of Messages not got at this moment" });
    }
  }

  static async editProfile(req, res) {
    try {
      var values = {};
      if (req.body.firstName) {
        values.firstName = req.body.firstName;
      } 
      if (req.body.lastName) {
        values.lastName = req.body.lastName;
      } 
      if (req.body.email) {
        values.email = req.body.email;
      } 
      if (req.body.jobTitle) {
        values.jobTitle = req.body.jobTitle;
      }

      if(Object.entries(values).length === 0) {
        res.status(404).json({ error: "Profile change failed, allowed to change here names, email and job title" })
      } else {
        const response = await db['User'].update(values, { where: { id: req.user.id } });
        if (response == 1) {
          res.status(200).json({ message: "Profile change successfully" })
        } else {
          res.status(404).json({ error: "Profile change failed, please confirm input and try again" });
        }
      }
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(409).send({ error: "Email already used for a company on the system, Please use a different email", field: error.errors[0].path });
      }
      return res.status(400).send({ message: "Sorry, profile change failed... Try again later" });
    }
  }
}
