import bcrypt from "bcrypt";
import db from "../models";
import generic from "../helpers/Generic";
import jwt from "jsonwebtoken";
import { UniqueConstraintError } from "sequelize";
const saltRounds = 10;

export default class UserController {
  static async getUsersList(req, res, next) {
    db["User"]
      .findAll({
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "jobTitle",
          "role",
          "companyId",
          "status",
          "lastActivity",
          "createdAt"
        ],
        order: [["createdAt", "DESC"]],
      })
      .then((users) => {
        res.status(200).send({
          result: users,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).send({
          message: "list of users not got",
        });
      });
  }

  static async register(req, res, next) {
    try {
      const response = await db.sequelize.transaction(async (t) => {
        const company = await db["Company"].create({
          coName: req.body.coName,
          coType: req.body.coType,
          coWebsite: req.body.coWebsite,
          districtBasedIn: req.body.districtBasedIn,
          businessActivityId: req.body.businessActivityId,
          shortDescription: req.body.shortDescription,
          slug: generic.generateSlug(req.body.coName),
          contactEmail: req.body.email,
          emailDisplay: false,
          status: "pending"
        }, { transaction: t });

        const activity = await db["ActivitiesOfCompany"].create({
          activityId: req.body.businessActivityId,
          companyId: company.id
        }, { transaction: t });

        const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const token = jwt.sign({ _id: req.body.email }, process.env.ACCOUNT_ACTIVATION_KEY, {
          expiresIn: '1h',
        });

        const user = await db["User"].create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          jobTitle: req.body.jobTitle,
          password: hashPassword,
          role: req.body.role,
          resetLink: token,
          companyId: company.id,
          status: "pending"
        }, { transaction: t });

        const subject = "We’re almost there let's verify your email";
        const content = `Dear ${req.body.firstName} ${req.body.lastName},<br><br> 
        Please verify your email in order to access your account. <br>
        Click on the button below or open it in your browser to activate your account, It will expire in 1h.<br><br><br>
        <a style="margin:35px 0;padding:15px 35px;background:#00AEEF;color:#ffffff;clear:both;border-radius:2px;text-decoration:none"
        href="${process.env.APP_URL}/activate-account/${token}">Activate account</a><br><br><br>`;
        generic.sendEmail(req.body.email, subject, content);
        return res.status(200).json({
          message: "An email is sent to your email, Check your email to activate your account." 
        });
      });
    } catch (error) {
      console.log(error)
      if (error instanceof UniqueConstraintError) {
        return res.status(409).send({
          error:
            "Company potentially already on the system or Your email used, Please check your email or company name",
          field: error.errors[0].path,
        });
      }
      return res.status(401).send({
        message:
          "Please confirm you provided all required info then try again",
      });
    }
  }

  static async createUser(req, res) {
    try {
      const hashPassword = bcrypt.hashSync(req.body.password.trim(), saltRounds);

      const user = await db["User"].create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.trim(),
        password: hashPassword,
        role: req.body.role,
        status: "active"
      });

      const subject = "Account Creation";
      const content = "Dear " + user.firstName + " " + user.lastName + ", <br><br>" +
        "An account has been created for you on Innovate Rwanda System. Please find below details of the account.<br><br>" +
        "<b>Email</b>: " + user.email + "<br>" +
        "<b>Password</b>: " + req.body.password + "<br>" +
        "<br>Change this default password as soon as possible.";
      generic.sendEmail(req.body.email, subject, content);
      return res.status(200).json({ message: "User Account created successfully." });
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

  static async login(req, res, next) {
    await db["User"]
      .findOne({
        where: {
          email: req.body.email.trim(),
          status: "active"
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(403).send({
            message: "Invalid email, password or company information or Account not activated, check your email",
          });
        }
        user.update({ lastActivity: db.sequelize.fn("NOW") });
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result == true) {
              db["Company"]
                .findOne({
                  where: { id: user.companyId },
                })
                .then((company) => {
                  delete user.dataValues.password;
                  res.locals.user = user;
                  if (!company) {
                    res.locals.companyInfo = "Company info not there";
                  } else {
                    res.locals.companyInfo = company;
                  }
                  next();
                })
                .catch((err) => {
                  res.status(403).send({
                    message: "Error - company info not got",
                  });
                });
            } else if (result == false) {
              res.status(403).send({
                message: "Wrong Password",
              });
            } else if (err) {
              console.log(err)
              res.status(403).send({
                message: "Error occurred -- checking password",
              });
            }
          }
        );
      })
      .catch((err) => {
        console.log("err", err)
        res.status(401).send({
          message: "Error occurred",
        });
        console.log(err);
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
    const user = await db["User"]
      .findOne({
        where: {
          email: email,
        }
      });
    if (!user) {
      return res.status(400).json({ error: "User with this email does not exist" });
    } else {
      const token = jwt.sign({ _id: user.id }, process.env.RESET_PASSWORD_KEY, {
        expiresIn: "1h",
      });
      if (token) {
        db["User"].update(
          { resetLink: token },
          {
            where: {
              email: email,
            },
          }).then(result => {
            if (result) {
              const subject = "[Innovate Rwanda] Please reset your password";
              const content = `
                Please use the following link to reset your password: <br><br><br>
                <a style="margin:35px 0;padding:15px 35px;background:#00AEEF;color:#ffffff;clear:both;border-radius:2px;text-decoration:none"
          href="${process.env.APP_URL}/reset-password/${token}">Reset password</a> <br><br><br>
                This link  will expire in 1h.`;
              generic.sendEmail(req.body.email, subject, content);
              return res.status(200).json({ message: "Email is sent, Check your email for the link" });
            }
          }).catch(error => {
            return res.status(400).json({ error: "Please confirm that the email is right, Try again later" });
          });
      } else {
        return res.status(400).json({ error: "Please try again later" });
      }
    }
  }

  static async resetPassword(req, res) {
    const { resetLink } = req.params;
    const { newPassword } = req.body;
    if (resetLink) {
      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).send({
            message: "Incorrect token or The link expired",
          });
        } else {
          var user = db["User"]
            .findOne({
              where: {
                resetLink: resetLink,
              }
            });
          if (!user) {
            return res.status(400).json({ error: "User with that link does not exist" });
          } else {
            bcrypt.hash(
              newPassword,
              saltRounds,
              function (err, hashPassword) {
                if (hashPassword) {
                  const response = db['User']
                    .update(
                      { password: hashPassword },
                      {
                        where: {
                          resetLink: resetLink,
                        },
                      }
                    );
                  return res.status(200).send({
                    message: "reset",
                  });
                } else {
                  return res.status(401).json({
                    message: "Sorry, change of password failed."
                  })
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
    const { activationLink } = req.params;
    const user = await db["User"]
      .findOne({
        where: {
          resetLink: activationLink,
        }
      });
    if (activationLink) {
      jwt.verify(activationLink, process.env.ACCOUNT_ACTIVATION_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).send({
            message: "Incorrect link or The link expired",
          });
        } else {

          if (!user) {
            return res.status(400).json({ error: "Account with that link does not exist" });
          } else {
            const response = db['User'].update(
              { status: "active" },
              {
                where: {
                  resetLink: activationLink
                },
              }
            );
            if (response) {
              console.log(user)
              const subject = "Let’s dive right in";
              const content = "Welcome to the innovate Rwanda community";
              generic.sendEmail(user.email, subject, content);
              return res.status(200).json({ message: "Account Activated. A confirmation is sent to your email" });
            } else {
              return res.status(200).json({ error: "Sorry, activation failed." });
            }
          }
        }
      });
    } else {
      return res.status(401).json({ error: "Activation Error" });
    }
  }

  static async changeRole(req, res) {
    try {
      const response = await db['User']
        .update(
          { role: req.body.role },
          {
            where: {
              id: req.params.userId,
            },
          }
        );
      return response
        ? res.status(200).json({
          message: "User's role changed successfully"
        })
        : res.status(404).json({
          error: "Sorry, role change failed..Try again"
        });
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
}
