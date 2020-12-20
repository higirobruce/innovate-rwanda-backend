import db from "../models";

export default class genericController {
  static async getCounts(req, res) {
    try {
      const pendingRequestsCount = await db['Company'].count({
        where: {
          status: "pending"
        }
      });

      const usersCount = await db['User'].count();

      const approvedCompaniesCount = await db['Company'].count({
        where: {
          status: "approved"
        }
      });

      return res.status(200).json({
        result: {
          pendingRequestsCount, usersCount, approvedCompaniesCount
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Counts not found" });
    }
  }

  static async getCountsCo(req, res) {
    try {
      const companyId = req.user.companyId;

      const jobs = await db['Job'].count({
        where: {
          companyId: companyId,
        },
      });

      const events = await db['Event'].count({
        where: {
          companyId: companyId,
        },
      });

      const blogs = await db['Blog'].count({
        where: {
          companyId: companyId,
        },
      });

      return res.status(200).json({
        result: {
          jobs, events, blogs
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Counts not found" });
    }
  }
}