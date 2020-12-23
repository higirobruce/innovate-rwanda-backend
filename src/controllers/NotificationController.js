import db from "../models";
import generic from "../helpers/Generic";

export default class NotificationController {
  static async notificationPost(mail) {
    try {
      await db['Notification'].create(mail);
    } catch (error) {
      console.log(error)
    }
  }

  static async getNotificationsForCompany(req, res) {
    try {
      const user = req.user;
      const notifications = await db['Notification'].findAll({
          where: { companyId: user.companyId, },
          attributes:["subject","content"],
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
}
