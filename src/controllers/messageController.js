import db from "../models";

export default class MessageController {
  static async messagePost(req, res) {
    try {
      const response = await db['Message'].create(req.body);
      if (response) {
        return res.status(200).send({
          message: "Message Sent",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " Message not sent at this moment" });
    }
  }

  static async getMessagesListPerCompany(req, res) {
    try {
      // companyId is slug
      const messages = await db['Message']
        .findAll({
          where: {
            companyId: req.params.companyId,
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
}
