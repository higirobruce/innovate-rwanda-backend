import db from "../models";
import generic from "../helpers/Generic";
import { UniqueConstraintError } from "sequelize";

export default class genericController {
  static async getCounts(req, res) {
    try {
      const pendingRequestsCount = await db['Company'].count({
        where: { status: "pending" }
      });
      const usersCount = await db['User'].count();
      const approvedCompaniesCount = await db['Company'].count({
        where: { status: "approved" }
      });
      return res.status(200).json({ result: { pendingRequestsCount, usersCount, approvedCompaniesCount } })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Counts not found" });
    }
  }

  //gives counts for new messages and notifications
  static async getCountsNew(req, res) {
    try {
      const newNotifications = await db['Notification'].count({
        where: { firstread: { $eq: null } }
      });
      const newMessages= await db['Message'].count({
        where: { firstread: { $eq: null } }
      });
      return res.status(200).json({ result: { newNotifications, newMessages } })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Counts not found" });
    }
  }

  static async getCountsCo(req, res) {
    try {
      const companyId = req.user.companyId;
      const jobs = await db['Job'].count({
        where: { companyId: companyId }
      });
      const events = await db['Event'].count({
        where: { companyId: companyId }
      });
      const blogs = await db['Blog'].count({
        where: { companyId: companyId }
      });

      return res.status(200).json({ result: { jobs, events, blogs } })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Counts not found" });
    }
  }

  static async addCompanyActivity(req, res) {
    try {
      const response = await db['ActivitiesOfCompany'].create(req.body);
      return res.status(200).send({ message: response });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(409).send({ error: "Activity already added for the company" });
      }
      console.log(err)
      return res.status(400).send({ message: "Activity not added at this moment" });
    }
  }

  static async removeCompanyActivity(req, res) {
    try {
      const response = await db["ActivitiesOfCompany"].destroy({
          where: { companyId: req.query.company, activityId: req.query.activity },
        })
      if (response) {
        return res.status(200).json({ message: "Activity Removed" })
      } else {
        return res.status(200).json({ message: "Activity not yet added" })
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Activity not removed..Try again later" });
    }
  }

  static async addPostActivity(req, res) {
    try {
      const response = await db['AudienceForPost'].create({
        typeOfPost: req.body.type,
        postId: req.body.post,
        activityId: req.body.activity
      });
      return res.status(200).send({ message: response });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(409).send({ error: "Activity already added" });
      }
      console.log(err)
      return res.status(400).send({ message: "Activity not added at this moment" });
    }
  }

  static async removePostActivity(req, res) {
    try {
      const response = await db["AudienceForPost"].destroy({
          where: { typeOfPost: req.query.type, postId: req.query.post, activityId: req.query.activity},
        })
      if (response) {
        return res.status(200).json({ message: "Activity Removed" })
      } else {
        return res.status(200).json({ message: "Activity not yet added" })
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Activity not removed..Try again later" });
    }
  }

  static async search(req, res) {
    try {
      const searchValue = req.query.searchValue.trim();
      var responseElement = {}, response = [];

      await generic.searchDirectory(searchValue, function (result) {
        response.push({directory: { status:result[0],result:result[1] }});
      })
      await generic.searchForEvents(searchValue, function (result) {
        response.push({events: { status:result[0],result:result[1] }});
      })
      await generic.searchForBlogs(searchValue, function (result) {
        response.push({blogs: { status:result[0],result:result[1] }});
      })

      await generic.searchForJobs(searchValue, function (result) {
        response.push({jobs: { status:result[0],result:result[1] }});
      })
      return res.status(200).json({ result: response })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Search failed for the moment" });
    }
  }
}