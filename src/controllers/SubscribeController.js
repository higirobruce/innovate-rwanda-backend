
import db from "../models";

export default class SubscribeController {
  static async subscribeToNotification(req, res) {
    db['Subscription'].create({
      email: req.body.email,
      status: "subscribed",
    })
      .then((result) => {
        res.status(200).send({
          message: "Subscribed",
        });
      })
      .catch((error) => {
        res.status(401).send({
          message: "Something went wrong",
        });
      });
  }

  static async unsubscribeFromNotification(req, res) {
    db['Subscription'].update(
      { status: "unsubscribed" },
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
