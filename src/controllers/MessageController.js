import db from "../models";
import notification from "../helpers/Notification";

export default class MessageController {
  static async messagePost(req, res) 
  {
    try {
      const message = await db['Message'].create(req.body);
      if (message) {
        notification.notify("message post",
          { email: message.email, companyId: message.companyId, message: message.message },
          function (response) {
            return res.status(200).json({ message: response });
          });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " Message not sent at this moment" });
    }
  }

  static async getMessagesListPerCompany(req, res) {
    try {
      const messages = await db['Message']
        .findAll({
          where: {
            companyId: req.params.companyId,//confirm ok getting companyId of logged in user instead of this
          },
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

  static async getMessageInfo(req, res) {
    try {
      const message = await db["Message"]
        .findOne({
          where: {
            id: req.params.messageId,
          },
          raw: true,
        });
      return message
        ? res.status(200).json({
          result: message
        })
        : res.status(404).json({
          error: "Sorry, Message not found",
        });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Message not found" });
    }
  }

  static async searchForMessages(req, res) {
    try {
      const likeOp = db.Op.iLike;
      const searchValue = req.query.searchValue.trim();

      const messages = await db['Message']
        .findAll({
          attributes: ["id", "email","message"],
          where: {
            companyId: req.user.companyId,
            [db.Op.or]: [
              { email: { [likeOp]: "%" + searchValue + "%" } },
              { message: { [likeOp]: "%" + searchValue + "%" } }
            ],
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

  static async setRead(req, res) {
    try {
      const messagesId = req.body.messages.split(',').map(Number);
      const response = await db["Message"].update(
        { firstread: db.sequelize.fn("NOW") },
        { where: { id: { [db.Op.in]: messagesId } } }
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
