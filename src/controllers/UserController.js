import bcrypt from "bcrypt";
import db from "../models";
import generic from "../helpers/Generic";
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
}
