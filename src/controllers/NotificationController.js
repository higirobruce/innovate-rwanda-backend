import db from "../models";
import generic from "../helpers/Generic";
const logger = require('../helpers/LoggerMod.js');

export default class NotificationController {
  static async notificationPost(mail) {
    try {
      for (var i = 0; i < mail.length; i++) {
        switch (mail[i].format) {
          case "Event":
          case "Blog":
          case "Job":

            if (mail[i].co_ids && mail[i].co_ids.length > 0) {
              var notifications = [];
              for (var j = 0; j < mail[i].co_ids.length; j++) {
                notifications.push({
                  companyId: mail[i].co_ids[j],
                  subject: mail[i].subject,
                  content: mail[i].content,
                  linkForMore: mail[i].linkForMore
                });
              }
              if (notifications.length > 0) {
                await db['Notification'].bulkCreate(notifications)
              }
            }
            await db['Notification'].create({
              companyId: mail[i].companyId,
              subject: mail[i].format+" Published: " + mail[i].subject,
              content: mail[i].content,
              linkForMore: mail[i].linkForMore
            });
            break;
          default:
            await db['Notification'].create({
              companyId: mail[i].companyId,
              subject: mail[i].subject,
              content: mail[i].content,
            });
        }
      }
    } catch (error) {
      logger.customLogger.log('error', error)
      //console.log(error)
    }
  }

  static async getNotificationsForCompany(req, res) {
    try {
      const user = req.user;
      const notifications = await db['Notification'].findAll({
        where: { companyId: user.companyId, },
        attributes: ["id", "subject", "content", "linkForMore", "createdAt", "firstread"],
        order: [['createdAt', 'DESC']]
      });
      if (notifications && notifications.length > 0) {
        return res.status(200).json({
          result: notifications,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No notification found",
        });
      }
    } catch (error) {
      //console.log(err)
      logger.customLogger.log('error', error)
      return res.status(400).send({ message: " List of notifications not got at this moment" });
    }
  }

  static async setRead(req, res) {
    try {
      const notificationsId = req.body.notifications.split(',').map(Number);
      const response = await db["Notification"].update(
        { firstread: db.sequelize.fn("NOW") },
        { where: { id: { [db.Op.in]: notificationsId } } }
      );
      if (response) {
        return res.status(200).send()
      } else {
        return res.status(404).send()
      }
    } catch (error) {
      //console.log(error)
      logger.customLogger.log('error', error)
      return res.status(400).send({ message: "Sorry, Failed at moment" });
    }
  }
}
