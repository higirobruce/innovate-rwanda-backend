import db from "../models";

export default class genericController {
  static async getCounts(req, res) {
    try {
      const companies = await db['Company'].findAll({
        attributes: ['status', [db.sequelize.fn('count', db.sequelize.col('status')), 'count']],
        group: ['Company.status'],
        raw: true,
        order: db.sequelize.literal('status DESC')
      });

      const totalCompanies = await db['Company'].count();

      const users = await db['User'].findAll({
        attributes: ['status', [db.sequelize.fn('count', db.sequelize.col('status')), 'count']],
        group: ['User.status'],
        raw: true,
        order: db.sequelize.literal('status DESC')
      });

      const totalUsers = await db['User'].count();

      return res.status(200).json({
        result: {
          companies, totalCompanies, users, totalUsers
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

      const jobs = await db['Job'].findAll({
        where: {
          companyId: companyId,
        },
        attributes: ['status', [db.sequelize.fn('count', db.sequelize.col('status')), 'count']],
        group: ['Job.status'],
        raw: true,
        order: db.sequelize.literal('status DESC')
      });

      const totalJobs = await db['Job'].count({
        where: {
          companyId: companyId,
        },
      });

      const events = await db['Event'].findAll({
        where: {
          companyId: companyId,
        },
        attributes: ['status', [db.sequelize.fn('count', db.sequelize.col('status')), 'count']],
        group: ['Event.status'],
        raw: true,
        order: db.sequelize.literal('status DESC')
      });

      const totalEvents = await db['Event'].count({
        where: {
          companyId: companyId,
        },
      });

      const blogs = await db['Blog'].findAll({
        where: {
          companyId: companyId,
        },
        attributes: ['status', [db.sequelize.fn('count', db.sequelize.col('status')), 'count']],
        group: ['Blog.status'],
        raw: true,
        order: db.sequelize.literal('status DESC')
      });

      const totalBlogs = await db['Blog'].count({
        where: {
          companyId: companyId,
        },
      });

      return res.status(200).json({
        result: {
          jobs, totalJobs, events, totalEvents, blogs, totalBlogs
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Counts not found" });
    }
  }
}