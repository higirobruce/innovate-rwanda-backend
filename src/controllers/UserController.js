import bcrypt from "bcrypt";
import db from "../models";
import generic from "../helpers/Generic";
import jwt from "jsonwebtoken";
const saltRounds = 10;

export default class UserController {
  static async getUsersList(req, res, next) {
    db["User"].findAll({
      attributes: [
        "firstName",
        "lastName",
        "email",
        "jobTitle",
        "role",
        "companyId",
        "status",
      ],
      order: [['createdAt', 'DESC']]
    })
      .then((users) => {
        res.status(200).send({
          result: users,
        });
      })
      .catch((err) => {
        console.log(err)
        return res.status(401).send({
          message: "list of users not got",
        });
      });
  }

  static async register(req, res, next) {
    await db["Company"]
      .create({
        coName: req.body.coName,
        coType: req.body.coType,
        coWebsite: req.body.coWebsite,
        districtBasedIn: req.body.districtBasedIn,
        areaOfInterest: req.body.areaOfInterest,
        shortDescription: req.body.shortDescription,
        slug: generic.generateSlug(req.body.coName),
        contactEmail: req.body.email,
        emailDisplay: false,
        status: "pending",
      })
      .then((result) => {
        bcrypt.hash(
          req.body.password,
          saltRounds,
          function (err, hashPassword) {
            db["User"]
              .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                jobTitle: req.body.jobTitle,
                password: hashPassword,
                role: req.body.role,
                companyId: result.id,
                status: "active",
              })
              .then((result) => {
                return res.status(200).send({
                  message: "Account Created",
                });
              })
              .catch((err) => {
                return res.status(401).send({
                  message: "Something went wrong - User Account",
                  //err: err
                });
              });
          }
        );
      })
      .catch((error) => {
        console.log(error);
        return res.status(401).send({
          message: "Company potentially already on the system, Please confirm then try again",
          //error: error
        });
      });
  }

  static async login(req, res, next) {
    await db["User"]
      .findOne({
        where: { email: req.body.email },
      })
      .then((user) => {
        if (!user) {
          return res.status(403).send({
            message: "Invalid email, password or company information",
          });
        }
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
                  delete user.password;
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
              res.status(403).send({
                message: "Error occurred -- checking password",
              });
            }
          }
        );
      })
      .catch((err) => {
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
        expiresIn: '1h',
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
              const content = "Please use the following link to reset your password: " +
                `${process.env.APP_URL}/resetPassword/${token}` +
                "  It will expire in 1h.";
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
    const { resetLink, newPassword } = req.body;
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
}
