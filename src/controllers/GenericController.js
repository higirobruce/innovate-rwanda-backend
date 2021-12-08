
import db from '../models';
import generic from '../helpers/Generic';
import { UniqueConstraintError } from 'sequelize';
import ExportHelper from '../helpers/ExportHelper';
const logger = require('../helpers/LoggerMod.js');

export default class genericController {
  static async exportCompanies(req, res) {
    const { model } = req.query;
    const { where, include } = ExportHelper(req.query);
    try {
      const companies = await db[model].findAll({ where, include });
      if (companies && companies.length > 0) {
        return res.status(200).json({ result: companies });
      }
      return res
        .status(404)
        .json({ result: [], error: 'No companies found at this moment' });
    } catch (error) {
      logger.customLogger.log('error', error)
      return res.status(400).send({
        message: 'Can not export companies right now, try again later',
      });
    }
  }
  static getCounts(req, res) {
      const pendingRequestsCount = db['Company'].count({
        where: { status: 'pending' },
      });
      const usersCount = db['User'].count();
      const approvedCompaniesCount =  db['Company'].count({
        where: { status: 'approved' },
      });
      const startupsCount =  db['Company'].count({
        where: { status: 'approved', coType:'startupcompany' },
      });
      const enablersCount =  db['Company'].count({
        where: { status: 'approved', coType:'ecosystemenabler' },
      });
      const govInstitutionsCount =  db['Company'].count({
        where: { status: 'approved', coType:'governmentagency' },
      });
      const subscribersCount =  db['Subscription'].count({
        where: { status: 'active' },
      });
    Promise.all([
      pendingRequestsCount,
      usersCount,
      approvedCompaniesCount,
      startupsCount,
      enablersCount,
      govInstitutionsCount,
      subscribersCount
    ]).then(counts => {
      return res.status(200).json({
        result: { 
          pendingRequestsCount : counts[0],
          usersCount : counts[1],
          approvedCompaniesCount : counts[2],
          startupsCount : counts[3],
          enablersCount : counts[4],
          govInstitutionsCount : counts[5],
          subscribersCount : counts[6]
        }
      });
    }).catch(error => {
      logger.customLogger.log('error', error);
      return res.status(400).send({ message: 'Sorry, Counts not found' });
    });
  }

  //gives counts for new messages and notifications
  static async getCountsNew(req, res) {
    try {
      const newNotifications = await db['Notification'].count({
        where: { companyId: req.user.companyId, firstread: null },
      });
      const newMessages = await db['Message'].count({
        where: { companyId: req.user.companyId, firstread: null },
      });
      return res
        .status(200)
        .json({ result: { newNotifications, newMessages } });
    } catch (error) {
      //console.log(err);
      logger.customLogger.log('error', error)
      return res.status(400).send({ message: 'Sorry, Counts not found' });
    }
  }

  static async getCountsCo(req, res) {
    try {
      const companyId = req.user.companyId;
      const jobs = await db['Job'].count({
        where: { companyId: companyId },
      });
      const events = await db['Event'].count({
        where: { companyId: companyId },
      });
      const blogs = await db['Blog'].count({
        where: { companyId: companyId },
      });

      return res.status(200).json({ result: { jobs, events, blogs } });
    } catch (error) {
      //console.log(err);
      logger.customLogger.log('error', error)
      return res.status(400).send({ message: 'Sorry, Counts not found' });
    }
  }

  static async addCompanyActivity(req, res) {
    try {
      const response = await db['ActivitiesOfCompany'].create(req.body);
      return res.status(200).send({ message: response });
    } catch (error) {
      logger.customLogger.log('error', error)
      if (error instanceof UniqueConstraintError) {
        return res
          .status(409)
          .send({ error: 'Activity already added for the company' });
      }
      console.log(error);
      return res
        .status(400)
        .send({ message: 'Activity not added at this moment' });
    }
  }

  static async removeCompanyActivity(req, res) {
    try {
      const response = await db['ActivitiesOfCompany'].destroy({
        where: { companyId: req.query.company, activityId: req.query.activity },
      });
      if (response) {
        return res.status(200).json({ message: 'Activity Removed' });
      } else {
        return res.status(200).json({ message: 'Activity not yet added' });
      }
    } catch (error) {
      logger.customLogger.log('error', error)
      //console.log(err);
      return res
        .status(400)
        .send({ message: 'Activity not removed..Try again later' });
    }
  }

  static async addPostActivity(req, res) {
    try {
      const response = await db['AudienceForPost'].create({
        typeOfPost: req.body.type,
        postId: req.body.post,
        activityId: req.body.activity,
      });
      return res.status(200).send({ message: response });
    } catch (error) {
      logger.customLogger.log('error', error)
      if (error instanceof UniqueConstraintError) {
        return res.status(409).send({ error: 'Activity already added' });
      }
      //console.log(err);
      return res
        .status(400)
        .send({ message: 'Activity not added at this moment' });
    }
  }

  static async removePostActivity(req, res) {
    try {
      const response = await db['AudienceForPost'].destroy({
        where: {
          typeOfPost: req.query.type,
          postId: req.query.post,
          activityId: req.query.activity,
        },
      });
      if (response) {
        return res.status(200).json({ message: 'Activity Removed' });
      } else {
        return res.status(200).json({ message: 'Activity not yet added' });
      }
    } catch (error) {
      //console.log(err);
      logger.customLogger.log('error', error)
      return res
        .status(400)
        .send({ message: 'Activity not removed..Try again later' });
    }
  }

  static async search(req, res) {
    try {
      const searchValue = req.query.searchValue.trim();
      var responseElement = {},
        response = [];

      await generic.searchDirectory(searchValue, function (result) {
        response.push({ directory: { status: result[0], result: result[1] } });
      });
      await generic.searchForEvents(searchValue, function (result) {
        response.push({ events: { status: result[0], result: result[1] } });
      });
      await generic.searchForBlogs(searchValue, function (result) {
        response.push({ blogs: { status: result[0], result: result[1] } });
      });

      await generic.searchForJobs(searchValue, function (result) {
        response.push({ jobs: { status: result[0], result: result[1] } });
      });
      return res.status(200).json({ result: response });
    } catch (error) {
      logger.customLogger.log('error', error)
      //console.log(err);
      return res
        .status(400)
        .send({ message: 'Sorry, Search failed for the moment' });
    }
  }

  static async upload(req, res) {
    return req.file && req.file.path
      ? res.status(201).json({ file: req.file.path.replace(/\\/g, '/') })
      : res.status(400).json({ message: 'File not uploaded, try again later' });
  }
}