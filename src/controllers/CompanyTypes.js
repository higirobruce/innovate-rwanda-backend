import db from "../models";

export default class CompanyTypes {
  static async getCompanyTypes(req, res) {
    try {
      const response = await db["CompanyTypes"].findAll();
      return res.status(200).json({
        result: response,
      });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, no company types found" });
    }
  }
}