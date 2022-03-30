/* eslint-disable no-plusplus */
import db from '../models';
import generic from '../helpers/Generic';
import responseWrapper from '../helpers/responseWrapper';
import { CONFLICT, NOT_FOUND, OK } from '../constants/statusCodes';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';

const logger = require('../helpers/LoggerMod');

/**
 * Job Controller Class
 */
export default class JobController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async jobPost(req, res) {
    const { activities } = req.body;
    const fields = req.body;
    const author = req.user;

    const job = await db.Job.create({
      title: fields.title,
      description: fields.description,
      companyId: author.companyId,
      category: fields.category,
      deadlineDate: fields.deadlineDate,
      deadlineTime: fields.deadlineTime,
      jobDetailsDocument: fields.jobDetailsDocument,
      status: fields.status,
    });
    const activitiesToLoad = [];
    for (let i = 0; i < activities.length; i++) {
      activitiesToLoad.push({
        typeOfPost: 'job',
        postId: job.id,
        activityId: activities[i],
      });
    }
    if (activitiesToLoad.length > 0) {
      await db.AudienceForPost.bulkCreate(activitiesToLoad);
    }
    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: author,
      description: `${author.firstName} ${author.lastName} created a job post titled '${job.title}'`,
    });
    return res.status(200).send({
      message: 'Job post saved',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async approveOrDeclineJobPost(req, res) {
    const { decision } = req.body;
    const foundJob = await db.Job.findOne({
      where: { id: req.body.jobId, status: { [db.Op.not]: decision } },
      attributes: ['id', 'title', 'description', 'companyId'],
    });

    if (!foundJob) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Job not found',
      });
    }

    if (foundJob.status === decision) {
      return responseWrapper({
        res,
        status: CONFLICT,
        message: `This job is already ${decision}`,
      });
    }

    await foundJob.update({ status: decision });

    await foundJob.reload();

    if (decision === 'approved') {
      const parameters = {
        id: req.body.jobId,
        title: foundJob.title,
        description: foundJob.description,
        file_name: '',
        format: 'Job',
        companyId: foundJob.companyId,
      };

      eventEmitter.emit(events.LOG_ACTIVITY, {
        actor: req.user,
        description: `${req.user.firstName} ${req.user.lastName} approved a job post titled '${foundJob.title}'`,
      });

      eventEmitter.emit(events.NOTIFY, {
        type: 'post approval',
        parameters,
      });

      return responseWrapper({
        res,
        status: OK,
        message: `Job has been ${decision}`,
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async manageJobPost(req, res) {
    const { decision } = req.body;
    await db.Job.findOne({
      where: { id: req.body.jobId, status: { [db.Op.not]: decision } },
      attributes: ['id', 'title', 'description', 'companyId', 'messages'],
    })
      .then((job) => {
        if (job) {
          let response;
          if (req.body.message) {
            if (job.messages) {
              job.messages[job.messages.length] = req.body.message;
            } else {
              job.messages = [];
              job.messages[0] = req.body.message;
            }
            response = job.update({ status: decision, messages: job.messages });
          } else {
            response = job.update({ status: decision });
          }
          if (response) {
            if (decision === 'approved') {
              const parameters = {
                id: req.body.jobId,
                title: job.title,
                description: job.description,
                file_name: '',
                format: 'Job',
                companyId: job.companyId,
              };
              eventEmitter.emit(events.LOG_ACTIVITY, {
                actor: req.user,
                description: `${req.user.firstName} ${req.user.lastName} approved a job post titled '${job.title}'`,
              });
              eventEmitter.emit(events.NOTIFY, {
                type: 'post approval',
                parameters,
              });

              return responseWrapper({
                res,
                status: OK,
                message: 'Post Approved, Emails sent to those in related activities and subscribers'
              });
            }
            return res.status(200).json({ message: `Job ${decision}` });
          }
          return res.status(404).json({ message: 'Action Failed' });
        }
        return res
          .status(404)
          .json({ message: 'Job could have been already treated' });
      })
      .catch((error) => {
        // console.log(err)
        logger.customLogger.log('error', error);
        return res.status(400).send({ message: 'Sorry, Action failed' });
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getApprovedJobsList(req, res) {
    const jobPosts = await db.Job.findAll({
      where: {
        status: 'approved',
      },
      include: [
        {
          model: db.Company,
          attributes: ['logo', ['coName', 'companyName']],
        },
        {
          model: db.AudienceForPost,
          attributes: [['activityId', 'activity']],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('Job.id'),
                db.Op.eq,
                db.sequelize.col('AudienceForPosts.postId')
              ),
              db.sequelize.where(
                db.sequelize.col('AudienceForPosts.typeOfPost'),
                db.Op.eq,
                'job'
              ),
            ],
          },
          include: [
            {
              model: db.BusinessActivities,
              attributes: ['name'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.activityId'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                  ),
                ],
              },
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    if (jobPosts && jobPosts.length > 0) {
      return res.status(200).json({
        result: jobPosts,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No job found at this moment',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getJobsListPerCompany(req, res) {
    const jobPosts = await db.Job.findAll({
      where: {
        companyId: req.params.companyId,
        status: {
          [db.Op.not]: 'deleted',
        },
      },
      include: [
        {
          model: db.Company,
          attributes: ['logo', ['coName', 'companyName']],
        },
        {
          model: db.AudienceForPost,
          attributes: [['activityId', 'activity']],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('Job.id'),
                db.Op.eq,
                db.sequelize.col('AudienceForPosts.postId')
              ),
              db.sequelize.where(
                db.sequelize.col('AudienceForPosts.typeOfPost'),
                db.Op.eq,
                'job'
              ),
            ],
          },
          include: [
            {
              model: db.BusinessActivities,
              attributes: ['name'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.activityId'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                  ),
                ],
              },
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    if (jobPosts && jobPosts.length > 0) {
      return res.status(200).json({
        result: jobPosts,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No Job Posts found',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getJobsList(req, res) {
    let jobPosts;
    if (req.params.status === 'all') {
      jobPosts = await db.Job.findAll({
        include: [
          {
            model: db.Company,
            attributes: ['logo', ['coName', 'companyName']],
          },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('Job.id'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts.postId')
                ),
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.typeOfPost'),
                  db.Op.eq,
                  'job'
                ),
              ],
            },
            include: [
              {
                model: db.BusinessActivities,
                attributes: ['name'],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.activityId'),
                      db.Op.eq,
                      db.sequelize.col(
                        'AudienceForPosts->BusinessActivity.id'
                      )
                    ),
                  ],
                },
              },
            ],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
    } else {
      jobPosts = await db.Job.findAll({
        where: {
          status: req.params.status,
        },
        include: [
          {
            model: db.Company,
            attributes: ['logo', ['coName', 'companyName']],
          },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('Job.id'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts.postId')
                ),
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.typeOfPost'),
                  db.Op.eq,
                  'job'
                ),
              ],
            },
            include: [
              {
                model: db.BusinessActivities,
                attributes: ['name'],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.activityId'),
                      db.Op.eq,
                      db.sequelize.col(
                        'AudienceForPosts->BusinessActivity.id'
                      )
                    ),
                  ],
                },
              },
            ],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
    }
    if (jobPosts && jobPosts.length > 0) {
      return res.status(200).json({
        result: jobPosts,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No Job Posts found',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getJobInfo(req, res) {
    const foundJob = await db.Job.findOne({
      where: {
        id: req.params.jobId,
      },
      include: [
        {
          model: db.Company,
          attributes: ['logo', ['coName', 'companyName']],
        },
        {
          model: db.AudienceForPost,
          attributes: [['activityId', 'activity']],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('Job.id'),
                db.Op.eq,
                db.sequelize.col('AudienceForPosts.postId')
              ),
              db.sequelize.where(
                db.sequelize.col('AudienceForPosts.typeOfPost'),
                db.Op.eq,
                'job'
              ),
            ],
          },
          include: [
            {
              model: db.BusinessActivities,
              attributes: ['name'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.activityId'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                  ),
                ],
              },
            },
          ],
        },
      ],
    });
    return foundJob
      ? res.status(200).json({
        result: foundJob,
      })
      : res.status(404).json({
        error: 'Sorry, Job not found',
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editJobInfo(req, res) {
    const foundJob = await db.Job.findByPk(req.body.id);
    if (!foundJob) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Job not found',
      });
    }

    await foundJob.update({
      ...req.body,
      id: undefined,
    });

    eventEmitter.emit(events.LOG_ACTIVITY,
      {
        actor: req.user,
        description: `${req.user.firstName} ${req.user.lastName} updated the job information titled '${foundJob.title}'`
      });

    return responseWrapper({
      res,
      status: OK,
      message: 'Job has been updated successfully'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async deleteJob(req, res) {
    const foundJob = await db.Job.findOne({
      where: {
        id: req.query.jobId,
      },
    });

    if (!foundJob) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Job not found'
      });
    }

    await foundJob.update({
      status: 'deleted'
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} deleted a job titled '${foundJob.title}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Job deleted'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getJobsFiltered(req, res) {
    try {
      const { filterBy } = req.query;
      const filterValue = req.query.filterValue.trim();
      let jobPosts;

      if (filterBy === 'company') {
        jobPosts = await db.Job.findAll({
          where: { companyId: filterValue, status: 'approved' },
          include: [
            {
              model: db.Company,
              attributes: ['logo', ['coName', 'companyName']],
            },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Job.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'job'
                  ),
                ],
              },
              include: [
                {
                  model: db.BusinessActivities,
                  attributes: ['name'],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('AudienceForPosts.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'AudienceForPosts->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
          ],
          order: [['deadlineDate', 'DESC']],
        });
      } else if (filterBy === 'company-type') {
        let companiesId;
        await generic.getCompaniesIdPerType(filterValue, (theCompanies) => {
          companiesId = theCompanies.map(company => company.id);
        });

        jobPosts = await db.Job.findAll({
          where: { companyId: { [db.Op.in]: companiesId }, status: 'approved' },
          include: [
            {
              model: db.Company,
              attributes: ['logo', ['coName', 'companyName']],
            },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Job.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'job'
                  ),
                ],
              },
              include: [
                {
                  model: db.BusinessActivities,
                  attributes: ['name'],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('AudienceForPosts.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'AudienceForPosts->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
          ],
          order: [['deadlineDate', 'DESC']],
        });
      } else if (filterBy === 'topic') {
        let postsId;
        await generic.getPostsIdPerActivity(
          'job',
          filterValue,
          (thepostsId) => {
            postsId = thepostsId.map(postId => postId.postId);
          }
        );

        jobPosts = await db.Job.findAll({
          where: { id: { [db.Op.in]: postsId }, status: 'approved' },
          include: [
            {
              model: db.Company,
              attributes: ['logo', ['coName', 'companyName']],
            },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Job.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'job'
                  ),
                ],
              },
              include: [
                {
                  model: db.BusinessActivities,
                  attributes: ['name'],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('AudienceForPosts.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'AudienceForPosts->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
          ],
          order: [['deadlineDate', 'DESC']],
        });
      } else if (filterBy === 'year') {
        jobPosts = await db.Job.findAll({
          where: {
            status: 'approved',
            [db.Op.and]: db.sequelize.where(
              db.sequelize.literal('EXTRACT(YEAR FROM "Job"."deadlineDate")'),
              filterValue
            ),
          },
          include: [
            {
              model: db.Company,
              attributes: ['logo', ['coName', 'companyName']],
            },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Job.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'job'
                  ),
                ],
              },
              include: [
                {
                  model: db.BusinessActivities,
                  attributes: ['name'],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('AudienceForPosts.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'AudienceForPosts->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
          ],
          order: [['updatedAt', 'DESC']],
        });
      }

      if (jobPosts && jobPosts.length > 0) {
        return res.status(200).json({ result: jobPosts });
      }
      return res
        .status(404)
        .json({ result: [], error: 'No job found at this moment' });
    } catch (error) {
      // console.log(err)
      logger.customLogger.log('error', error);
      return res.status(400).send({ message: 'No jobs found at this moment' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Obect} res
   * @returns {Object} Response
   */
  static async getJobsSorted(req, res) {
    const { sortBy } = req.query;
    const sortValue = req.query.sortValue.trim();
    let jobPosts;

    if (sortValue === 'desc' || sortValue === 'asc') {
      if (sortBy === 'date') {
        jobPosts = await db.Job.findAll({
          where: { status: 'approved' },
          include: [
            {
              model: db.Company,
              attributes: ['logo', ['coName', 'companyName']],
            },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Job.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'job'
                  ),
                ],
              },
              include: [
                {
                  model: db.BusinessActivities,
                  attributes: ['name'],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('AudienceForPosts.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'AudienceForPosts->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
          ],
          order: [['deadlineDate', sortValue]],
        });
      } else if (sortBy === 'title') {
        jobPosts = await db.Job.findAll({
          where: { status: 'approved' },
          include: [
            {
              model: db.Company,
              attributes: ['logo', ['coName', 'companyName']],
            },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Job.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'job'
                  ),
                ],
              },
              include: [
                {
                  model: db.BusinessActivities,
                  attributes: ['name'],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('AudienceForPosts.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'AudienceForPosts->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
          ],
          order: [['title', sortValue]],
        });
      }
    }

    if (jobPosts && jobPosts.length > 0) {
      return res.status(200).json({ result: jobPosts });
    }
    return res
      .status(404)
      .json({ result: [], error: 'No job found at this moment' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async searchForJobs(req, res) {
    const searchValue = req.query.searchValue.trim();
    generic.searchForJobs(searchValue, result => res.status(result[0]).send(result[1]));
  }
}
