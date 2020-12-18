
import db from "../models";
import generic from "../helpers/Generic";
import { UniqueConstraintError } from "sequelize";

export default class SubscribeController {
  static async subscribeToNotification(req, res) {
    db['Subscription'].create({
      email: req.body.email,
      status: "active",
    })
      .then((result) => {
        const subject = "Let’s keep in touch";
        const content = "Thank you for choosing to receive updated info from our community.";
        generic.sendEmail(req.body.email, subject, content);
        return res.status(200).send({
          message: "Subscribed",
        });
      })
      .catch((error) => {
        console.log(error)
        if (error instanceof UniqueConstraintError) {
          return res.status(409).send({
            error:
              "Email already subscribed",
            field: error.errors[0].path,
          });
        }
        res.status(401).send({
          message: "Something went wrong",
        });
      });
  }

  static async unsubscribeFromNotification(req, res) {
    db['Subscription'].update(
      { status: "inactive" },
      {
        where: {
          email: req.body.email,
        },
      }
    )
      .then(() => {
        res.status(200).send({
          message: "Unsubscribed",
        });
      })
      .catch((err) => {
        res.status(401).send({
          message: "An error occurred",
        });
      });
  }

  static async getSubscriptions(req, res) {
    if (req.params.status == "all") {
      db['Subscription'].findAll({ order: [['createdAt', 'DESC']] })
        .then((subscriptions) => {
          res.status(200).send({
            result: subscriptions,
          });
        })
        .catch((err) => {
          res.status(401).send({
            message: "list of subscriptions not got",
            err: err,
          });
        });
    } else {
      db['Subscription'].findAll({
        where: {
          status: req.params.status,
        },
        order: [['createdAt', 'DESC']]
      })
        .then((subscriptions) => {
          res.status(200).send({
            result: subscriptions,
          });
        })
        .catch((err) => {
          res.status(401).send({
            message: "list of subscriptions not got",
            err: err,
          });
        });
    }
  }
}
