import db from "../models";
import generic from "../helpers/Generic";

export default class NotificationController {
  static async notificationPost(mail) {
    try {
      for (var i = 0; i < mail.length; i++) {
        switch (mail[i].format) {
          case "Event":
          case "Blog":
          case "Job":
            if (mail[i].co_ids && mail[i].co_ids.length > 0) {
              for (var j = 0; j < mail[i].co_ids.length; j++) {
                await db['Notification'].create({
                  companyId: mail[i].co_ids[j],
                  subject: mail[i].subject,
                  content: mail[i].content,
                });
              }
            }
            await db['Notification'].create({
              companyId: mail[i].companyId,
              subject: mail[i].format+" Published: " + mail[i].subject,
              content: mail[i].content,
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
      console.log(error)
    }
  }

  static async getNotificationsForCompany(req, res) {
    try {
      const user = req.user;
      const notifications = await db['Notification'].findAll({
        where: { companyId: user.companyId, },
        attributes: ["subject", "content"],
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
    } catch (err) {
      console.log(err)
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
      console.log(error)
      return res.status(400).send({ message: "Sorry, Failed at moment" });
    }
  }
}
