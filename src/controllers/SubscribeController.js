
import db from "../models";
import generic from "../helpers/Generic";
import notification from "../helpers/Notification";
import { UniqueConstraintError } from "sequelize";
const logger = require('../helpers/LoggerMod.js');

export default class SubscribeController {
  static async subscribeToNotification(req, res) 
  {
    db['Subscription'].create({ email: req.body.email, status: "active" }).then((subscription) => {
      if (subscription) {
        notification.notify("subscribe", { email: subscription.email }, function (response) {
          return res.status(200).json({ message: response });
        });
      } else {
        return res.status(401).json({ message: "Sorry, subscription failed, try later" })
      }
      }).catch((error) => {
        //console.log(error)
        logger.customLogger.log('error', error)
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
    await db["Subscription"].findOne({
      where: { email: req.params.email.trim() }
    }).then((subscription) => {
      if (!subscription) {
        return res.status(400).json({ message: "Receiving the emails means your company has activities belonged to by the posts, to unsubscribe change company's activities on the platform." });
      } else {
        subscription.destroy().then(() => {
          res.status(200).send({
            message: "Unsubscribed",
          });
        }).catch((error) => {
          logger.customLogger.log('error', error)
          res.status(401).send({
            message: "An error occurred while unsubscribing, try again later",
          });
        });;
      }

    }).catch((error) => {
      logger.customLogger.log('error', error)
      res.status(401).send({
        message: "An error occurred",
      });
    });
  }

  static async getSubscriptions(req, res) {
    db['Subscription'].findAll({ order: [['updatedAt', 'DESC']], attributes: { exclude: ['createdAt', 'updatedAt'] } })
      .then((subscriptions) => {
        res.status(200).send({
          result: subscriptions,
        });
    }).catch((error) => {
      logger.customLogger.log('error', error)
      res.status(401).send({
        message: "list of subscriptions not got",
        err: err,
      });
    });
  }
}
