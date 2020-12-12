import db from "../models";

export default class BusinessActivities {
  static async getBusinessActivities(req, res) {
    try {
      const response = await db["BusinessActivities"].findAll({});
      return res.status(200).json({
        result: response,
      });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Sorry, no business activities found" });
    }
  }
}
