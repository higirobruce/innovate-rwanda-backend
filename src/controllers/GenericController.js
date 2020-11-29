import db from "../models";

export default class genericController {
  static async getCounts(req, res) {
    try {
      const pendingRequestsCount = await db['Company'].count({
        where: {
          status: "pending"
        }
      });
      const usersCount = await db['User'].count({
        where: {
          status: "active"
        }
      });
      const approvedCompaniesCount = await db['Company'].count({
        where: {
          status: "approved"
        }
      });
      return res.status(200).json({
            result: { pendingRequestsCount, usersCount, approvedCompaniesCount }
      })
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Counts not found" });
    }
  }

  static generateSlug(company_name) {
    return company_name.replace(/ /g, "-").toLowerCase();
  }
}