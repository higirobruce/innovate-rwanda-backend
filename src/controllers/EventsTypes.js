import db from "../models";
const logger = require('../helpers/LoggerMod.js');

export default class EventsTypes {
  static async getEventsTypes(req, res) {
    try {
      const response = await db["EventsTypes"].findAll({ order: [["name", "ASC"]] });
      return res.status(200).json({ result: response });
    } catch (error) {
      logger.customLogger.log('error', error)
      return res.status(400).send({ message: "Sorry, no event types found" });
    }
  }

  static async addType(req, res) {
    try {
      const response = await db['EventsTypes'].create(req.body);
      return res.status(200).send({ message: response });
    } catch (error) {
      logger.customLogger.log('error', error)
      return res.status(400).send({ message: "Sorry, Failed to add event type at moment" });
    }
  }

  static async editType(req, res) {
    try {
      const update = await db["EventsTypes"].update((req.body), {
        where: { id: req.body.id }
      });
      return update ? res.status(200).json({ result: "Edited Successfully" })
                    : res.status(404).json({ error: "Sorry, No record edited" });
    } catch (error) {
      logger.customLogger.log('error', error)
      return res.status(400).send({ message: "Sorry, Edit failed" });
    }
  }

  static async removeType(req, res) {
    try {
      const response = await db["EventsTypes"].destroy({
        where: { id: req.query.type }
      })
      if (response) {
        return res.status(200).json({ message: "Type Removed" })
      } else {
        return res.status(200).json({ message: "Type not yet added" })
      }
    } catch (error) {
      logger.customLogger.log('error', error)
      return res.status(400).send({ message: "Sorry, Failed to remove event type at moment" });
    }
  }
}