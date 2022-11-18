/* eslint-disable no-plusplus */
import jwt from 'jsonwebtoken';
import db from '../models';
import generic from '../helpers/Generic';
import responseWrapper from '../helpers/responseWrapper';

import GenerateMeta from '../helpers/GenerateMeta';

import { customLogger } from '../helpers/LoggerMod';
import { NOT_FOUND, OK } from '../constants/statusCodes';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';

const encryptor = require('simple-encryptor')(process.env.COMPANY_DEL_KEY);

/**
 * Class - CompanyController
 */
export default class CompanyController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} - Response
   */
  static async getCompaniesList(req, res) {
    const companies = await db.Company.findAll({
      order: [['status', 'ASC'], ['updatedAt', 'DESC']],
      include: [
        { model: db.BusinessActivities, attributes: ['name'] },
        {
          model: db.ActivitiesOfCompany,
          attributes: ['companyId', 'activityId'],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('ActivitiesOfCompanies.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
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
                    db.sequelize.col('ActivitiesOfCompanies.activityId'),
                    db.Op.eq,
                    db.sequelize.col(
                      'ActivitiesOfCompanies->BusinessActivity.id'
                    )
                  ),
                ],
              },
            },
          ],
        },
        { model: db.CompanyTypes, attributes: ['name'] },
      ],
    });
    return responseWrapper({
      res,
      status: OK,
      result: companies
    });
  }

  // static async getApprovedCompaniesList(req, res) {
  //   try {
  //     const companies = await db['Company'].findAll({
  //       where: { status: 'approved' },
  //       order: [['createdAt', 'DESC']],
  //       include: [
  //         { model: db['BusinessActivities'], attributes: ['name'] },
  //         {
  //           model: db['ActivitiesOfCompany'],
  //           attributes: ['companyId', 'activityId'],
  //           on: {
  //             [db.Op.and]: [
  //               db.sequelize.where(
  //                 db.sequelize.col('ActivitiesOfCompanies.companyId'),
  //                 db.Op.eq,
  //                 db.sequelize.col('Company.id')
  //               ),
  //             ],
  //           },
  //           include: [
  //             {
  //               model: db['BusinessActivities'],
  //               attributes: ['name'],
  //               on: {
  //                 [db.Op.and]: [
  //                   db.sequelize.where(
  //                     db.sequelize.col('ActivitiesOfCompanies.activityId'),
  //                     db.Op.eq,
  //                     db.sequelize.col(
  //                       'ActivitiesOfCompanies->BusinessActivity.id'
  //                     )
  //                   ),
  //                 ],
  //               },
  //             },
  //           ],
  //         },
  //         { model: db['CompanyTypes'], attributes: ['name'] },
  //       ],
  //     });
  //     if (companies && companies.length > 0) {
  //       return res.status(200).json({ result: companies });
  //     }
  //     return res
  //       .status(404)
  //       .json({ result: [], error: 'No companies found at this moment' });
  //   } catch (err) {
  //     console.log(err);
  //     return res
  //       .status(400)
  //       .send({ message: 'No companies found at this moment' });
  //   }
  // }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} - Response
   */
  static async getApprovedCompaniesList(req, res) {
    let where = { status: 'approved' };
    const {
      page,
      companyType,
      activity,
      location,
      orderType,
      orderValue,
      search,
    } = req.query;
    if (companyType) {
      where = {
        ...where,
        coType: companyType,
      };
    }
    if (activity) {
      let companiesId;
      await generic.getCompaniesIdPerActivity(
        activity,
        (thecompaniesId) => {
          companiesId = thecompaniesId.map(
            companyId => companyId.companyId
          );
        }
      );
      where = {
        ...where,
        [db.Op.or]: [
          { id: { [db.Op.in]: companiesId } },
          { businessActivityId: activity }]
      };
    }
    if (location) {
      where = {
        ...where,
        districtBasedIn: location,
      };
    }
    // manage search query
    if (search) {
      where = {
        ...where,
        coName: {
          [db.Op.iLike]: `%${search}%`,
        },
      };
    }
    const limit = 20;
    const count = await db.Company.count({ where });
    const offset = page === 1 ? 0 : (parseInt(page, 10) - 1) * limit;
    // manage orders
    const order = [[orderType || 'createdAt', orderValue || 'DESC']];

    const companies = await db.Company.findAll({
      where,
      order,
      limit,
      offset,
      include: [
        { model: db.BusinessActivities, attributes: ['name'] },
        {
          model: db.ActivitiesOfCompany,
          attributes: ['companyId', 'activityId'],
          // on: {
          //   [db.Op.and]: [
          //     db.sequelize.where(
          //       db.sequelize.col('ActivitiesOfCompanies.companyId'),
          //       db.Op.eq,
          //       db.sequelize.col('Company.id')
          //     ),
          //   ],
          // },
          include: [
            {
              model: db.BusinessActivities,
              attributes: ['name'],
              // on: {
              //   [db.Op.and]: [
              //     db.sequelize.where(
              //       db.sequelize.col('ActivitiesOfCompanies.activityId'),
              //       db.Op.eq,
              //       db.sequelize.col(
              //         'ActivitiesOfCompanies->BusinessActivity.id'
              //       )
              //     ),
              //   ],
              // },
            },
          ],
        },
        { model: db.CompanyTypes, attributes: ['name'] },
      ],
    });
    if (companies && companies.length > 0) {
      return responseWrapper({
        res,
        status: OK,
        meta: GenerateMeta(count, limit, parseInt(page, 10)),
        result: companies,
      });
    }
    return responseWrapper({
      res,
      status: NOT_FOUND,
      result: [],
      error: 'No companies found at this moment'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async approveOrDeclineCompany(req, res) {
    const { decision } = req.body;
    const company = await db.Company.findOne({
      where: { id: req.body.id },
    });
    if (company) {
      const response = await company.update(
        { status: decision },
        { where: { id: company.id } }
      );
      if (response) {
        const owner = await db.User.findOne({
          where: { companyId: company.id },
          raw: true,
        });
        const parameters = {
          firstName: owner.firstName,
          lastName: owner.lastName,
          email: owner.email,
          companyName: company.coName,
          decision,
        };

        eventEmitter.emit(events.LOG_ACTIVITY, {
          actor: req.user,
          description: `${req.user.firstName} ${req.user.lastName} ${decision} a company named '${company.name}'`
        });

        eventEmitter.emit(events.NOTIFY, {
          type: 'company approval',
          parameters,
        });

        return responseWrapper({
          res,
          status: OK,
          message: `Company ${decision}`
        });
      }
      return res.status(404).json({
        message:
              ' Something is wrong, please confirm input provided is okay ',
      });
    }
    return res
      .status(404)
      .json({ message: ' The mentioned company was not found ' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async manageCompany(req, res) {
    const company = await db.Company.findOne({
      where: { id: req.body.id },
    });
    if (company) {
      const { decision } = req.body;
      let response;
      if (req.body.message) {
        if (company.messages) {
          company.messages[company.messages.length] = req.body.message;
        } else {
          company.messages = [];
          company.messages[0] = req.body.message;
        }
        response = await company.update({
          status: decision,
          messages: company.messages,
        });
      } else {
        response = await company.update({ status: decision });
      }
      if (response) {
        if (req.user && req.user.role !== 'normal') {
          const owner = await db.User.findOne({
            where: { companyId: company.id },
            raw: true,
          });
          const parameters = {
            firstName: owner.firstName,
            lastName: owner.lastName,
            email: owner.email,
            companyName: company.coName,
            decision,
          };

          eventEmitter.emit(events.NOTIFY, {
            type: 'company approval',
            parameters,
          });

          return responseWrapper({
            res,
            status: OK,
            message: `Company ${decision}`
          });
        }
        return res.status(200).json({ message: `Company ${decision}` });
      }
      return res.status(404).json({
        message:
              ' Something is wrong, please confirm input provided is okay ',
      });
    }
    return res
      .status(404)
      .json({ message: ' The mentioned company was not found ' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getCompanyInfo(req, res) {
    const company = await db.Company.findOne({
      where: { id: req.params.companyId },
      include: [
        { model: db.BusinessActivities, attributes: ['name'] },
        {
          model: db.ActivitiesOfCompany,
          attributes: ['companyId', 'activityId'],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('ActivitiesOfCompanies.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
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
                    db.sequelize.col('ActivitiesOfCompanies.activityId'),
                    db.Op.eq,
                    db.sequelize.col(
                      'ActivitiesOfCompanies->BusinessActivity.id'
                    )
                  ),
                ],
              },
            },
          ],
        },
        { model: db.CompanyTypes, attributes: ['name'] },
      ],
    });
    const owner = await db.User.findOne({
      where: { companyId: company.id },
      raw: true,
    });
    delete owner.password;
    return company
      ? res.status(200).json({ result: { company, owner } })
      : res.status(404).json({ error: 'Sorry, Company not found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getCompanyInfoPublic(req, res) {
    const company = await db.Company.findOne({
      where: { slug: req.params.slug, status: 'approved' },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        { model: db.BusinessActivities, attributes: ['name'] },
        {
          model: db.ActivitiesOfCompany,
          attributes: ['activityId'],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('ActivitiesOfCompanies.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
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
                    db.sequelize.col('ActivitiesOfCompanies.activityId'),
                    db.Op.eq,
                    db.sequelize.col(
                      'ActivitiesOfCompanies->BusinessActivity.id'
                    )
                  ),
                ],
              },
            },
          ],
        },
        { model: db.CompanyTypes, attributes: ['name'] },
      ],
    });
    const activities = company.get({ plain: true }).ActivitiesOfCompanies;
    const activitiesSimilar = [];
    let similarCompanies;

    for (let i = 0; i < activities.length; i++) {
      activitiesSimilar.push(Object.values(activities[i])[0]);
    }

    if (activitiesSimilar.length > 0) {
      let similarCompaniesId;
      await generic.getSimilarCompaniesId(
        company.id,
        activitiesSimilar,
        (theSimilarCompaniesId) => {
          similarCompaniesId = theSimilarCompaniesId.map(
            companyId => companyId.companyId
          );
        }
      );

      similarCompanies = await db.Company.findAll({
        attributes: [['coName', 'companyName'], 'logo', 'slug'],
        where: { id: { [db.Op.in]: similarCompaniesId }, status: 'approved' },
      });
    }
    const type = company
        && (await db.CompanyTypes.findOne({
          where: {
            slug: company.coType,
          },
        }));
    return company
      ? res
        .status(200)
        .json({ result: { company, similarCompanies }, meta: type })
      : res.status(404).json({ error: 'Sorry, Company not found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getCompanyMyInfo(req, res) {
    const owner = await db.User.findOne({
      where: { companyId: req.params.companyId },
      raw: true,
    });
    const company = await db.Company.findOne({
      where: { id: req.params.companyId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        { model: db.BusinessActivities, attributes: ['name'] },
        {
          model: db.ActivitiesOfCompany,
          attributes: ['companyId', 'activityId'],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('ActivitiesOfCompanies.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
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
                    db.sequelize.col('ActivitiesOfCompanies.activityId'),
                    db.Op.eq,
                    db.sequelize.col(
                      'ActivitiesOfCompanies->BusinessActivity.id'
                    )
                  ),
                ],
              },
            },
          ],
        },
        { model: db.CompanyTypes, attributes: ['name'] },
      ],
    });
    delete owner.password;
    console.log(company);
    return company
      ? res.status(200).json({ result: { company, owner } })
      : res.status(404).json({ error: 'Sorry, Company not found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editCompanyInfo(req, res) {
    const response = await db.Company.update(req.body, {
      where: { id: req.body.id },
    });
    return response
      ? res
        .status(200)
        .json({ message: 'Recent change is updated successfully' })
      : res.status(404).json({ message: 'Sorry, No record edited' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async deleteCompany(req, res) {
    await db.Company.update(
      { status: 'deleted' },
      { where: { id: req.params.companyId } }
    );

    const foundCompany = await db.Company.findByPk(req.params.companyId);
    if (!foundCompany) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Company not found',
      });
    }

    await foundCompany.update({
      status: 'deleted'
    });
    await db.User.update(
      { status: 'inactive' },
      { where: { companyId: req.params.companyId } }
    );
    await db.Blog.update(
      { status: 'inactive' },
      { where: { companyId: req.params.companyId } }
    );
    await db.Job.update(
      { status: 'inactive' },
      { where: { companyId: req.params.companyId } }
    );
    await db.Event.update(
      { status: 'inactive' },
      { where: { companyId: req.params.companyId } }
    );

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} deleeted a company named '${foundCompany.name}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Company successfully deleted',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async deleteOwnCo(req, res) {
    const companyData = await db.Company.findOne({
      where: { id: req.user.companyId },
      include: [
        {
          model: db.User,
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('User.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
              ),
            ],
          },
        },
        {
          model: db.ActivitiesOfCompany,
          attributes: ['companyId', 'activityId', 'createdAt', 'updatedAt'],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('ActivitiesOfCompanies.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
              ),
            ],
          },
        },
        { model: db.CompanyTypes, attributes: ['name'] },
        {
          model: db.Blog,
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('Blogs.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
              ),
            ],
          },
          include: [
            {
              model: db.AudienceForPost,
              attributes: [
                'typeOfPost',
                'postId',
                'activityId',
                'createdAt',
                'updatedAt',
              ],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Blogs.id'),
                    db.Op.eq,
                    db.sequelize.col('Blogs->AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('Blogs->AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'blog'
                  ),
                ],
              },
            },
          ],
        },
        {
          model: db.Job,
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('Jobs.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
              ),
            ],
          },
          include: [
            {
              model: db.AudienceForPost,
              attributes: [
                'typeOfPost',
                'postId',
                'activityId',
                'createdAt',
                'updatedAt',
              ],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Jobs.id'),
                    db.Op.eq,
                    db.sequelize.col('Jobs->AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('Jobs->AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'job'
                  ),
                ],
              },
            },
          ],
        },
        {
          model: db.Event,
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('Events.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
              ),
            ],
          },
          include: [
            {
              model: db.AudienceForPost,
              attributes: [
                'typeOfPost',
                'postId',
                'activityId',
                'createdAt',
                'updatedAt',
              ],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Events.id'),
                    db.Op.eq,
                    db.sequelize.col('Events->AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('Events->AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'event'
                  ),
                ],
              },
            },
          ],
        },
        {
          model: db.Message,
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('Messages.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
              ),
            ],
          },
        },
        {
          model: db.Notification,
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('Notifications.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
              ),
            ],
          },
        },
      ],
    });
    if (companyData) {
      const encryptedCompanyData = encryptor.encrypt(companyData);
      const token = jwt.sign(
        { _id: companyData.coName },
        process.env.COMPANY_DEL_KEY,
        {
          expiresIn: '30d',
        }
      );
      if (token && encryptedCompanyData) {
        await db.DeletedCompany
          .create({ data: encryptedCompanyData, recoveryToken: token })
          .then((result) => {
            if (result) {
              generic.deleteCompany(companyData, (response) => {
                if (response !== -1) {
                  eventEmitter.emit(events.NOTIFY, {
                    type: 'delete own company',
                    parameters: {
                      email: companyData.contactEmail,
                      companyName: companyData.coName,
                      token,
                    }
                  });

                  return responseWrapper({
                    res,
                    status: OK,
                    message: 'Company deleted successfully, a confirmation email just got sent to you about that'
                  });
                }
                return res.status(404).json({
                  message: 'Could not delete all, try again later',
                });
              });
            } else {
              return res
                .status(404)
                .send({ message: 'Please try again later' });
            }
          }).catch((error) => {
            customLogger.log('error', error);
            // console.log(error);
            return res.status(400).json({
              error: 'Failed to complete the task, please try later',
            });
          });
      } else {
        return res.status(400).json({ error: 'Please try again later' });
      }
    } else {
      return res
        .status(404)
        .json({ message: 'You are not allowed to delete this company' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async recoverCompany(req, res) {
    const { recoveryToken } = req.params;
    // const { src } = req.query;

    if (recoveryToken) {
      jwt.verify(
        recoveryToken,
        process.env.COMPANY_DEL_KEY,
        (error, decoded) => {
          console.log({ decoded });
          if (error) {
            return res
              .status(401)
              .send({ message: 'Incorrect token or The link expired' });
          }
          db.DeletedCompany
            .findOne({
              where: { recoveryToken },
            })
            .then((encryptedCompanyData) => {
              console.log(encryptedCompanyData.data);
              if (!encryptedCompanyData) {
                return res.status(400).json({
                  error: 'Deleted Company with that link does not exist',
                });
              }
              const decryptedCompanyData = encryptor.decrypt(
                encryptedCompanyData.data
              );
              console.log(decryptedCompanyData);
              if (decryptedCompanyData) {
                return res
                  .status(200)
                  .send({ result: decryptedCompanyData });
              }
              return res
                .status(404)
                .send({ message: 'Try again later' });
            }).catch((err) => {
              customLogger.log('error', err);
              return res
                .status(400)
                .send({ error: 'Failed to recover the company' });
            });
        }
      );
    } else {
      return res.status(401).json({ error: 'Authentication Error' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getDirectoryFiltered(req, res) {
    // location       | activity           | year-founded

    const { filterBy } = req.query;
    const filterValue = req.query.filterValue.trim();
    let directory;

    if (filterBy === 'location') {
      directory = await db.Company.findAll({
        where: { districtBasedIn: filterValue, status: 'approved' },
        include: [
          { model: db.BusinessActivities, attributes: ['name'] },
          {
            model: db.ActivitiesOfCompany,
            attributes: ['activityId'],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
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
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col(
                        'ActivitiesOfCompanies->BusinessActivity.id'
                      )
                    ),
                  ],
                },
              },
            ],
          },
          { model: db.CompanyTypes, attributes: ['name'] },
        ],
        order: [['createdAt', 'DESC']],
      });
    } else if (filterBy === 'activities') {
      let companiesId;
      await generic.getCompaniesIdPerActivity(
        filterValue,
        (thecompaniesId) => {
          companiesId = thecompaniesId.map(
            companyId => companyId.companyId
          );
        }
      );

      directory = await db.Company.findAll({
        where: { id: { [db.Op.in]: companiesId } },
        include: [
          {
            model: db.BusinessActivities,
            attributes: ['name'],
          },
          {
            model: db.ActivitiesOfCompany,
            attributes: ['activityId'],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
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
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col(
                        'ActivitiesOfCompanies->BusinessActivity.id'
                      )
                    ),
                  ],
                },
              },
            ],
          },
          { model: db.CompanyTypes, attributes: ['name'] },
        ],
        order: [['createdAt', 'DESC']],
      });
    } else if (filterBy === 'year-founded') {
      directory = await db.Company.findAll({
        where: { yearFounded: filterValue, status: 'approved' },
        include: [
          { model: db.BusinessActivities, attributes: ['name'] },
          {
            model: db.ActivitiesOfCompany,
            attributes: ['activityId'],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
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
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col(
                        'ActivitiesOfCompanies->BusinessActivity.id'
                      )
                    ),
                  ],
                },
              },
            ],
          },
          { model: db.CompanyTypes, attributes: ['name'] },
        ],
        order: [['createdAt', 'DESC']],
      });
    }

    if (directory && directory.length > 0) {
      return res.status(200).json({ result: directory });
    }
    return res.status(404).json({ result: [], error: 'No Company found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getDirectorySorted(req, res) {
    // year-founded or names

    const { sortBy } = req.query;
    const sortValue = req.query.sortValue.trim();
    let directory;

    if (sortValue === 'desc' || sortValue === 'asc') {
      if (sortBy === 'date') {
        directory = await db.Company.findAll({
          where: { status: 'approved' },
          include: [
            { model: db.BusinessActivities, attributes: ['name'] },
            {
              model: db.ActivitiesOfCompany,
              attributes: ['activityId'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('ActivitiesOfCompanies.companyId'),
                    db.Op.eq,
                    db.sequelize.col('Company.id')
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
                        db.sequelize.col('ActivitiesOfCompanies.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'ActivitiesOfCompanies->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
            { model: db.CompanyTypes, attributes: ['name'] },
          ],
          order: [['yearFounded', sortValue]],
        });
      } else if (sortBy === 'name') {
        directory = await db.Company.findAll({
          where: { status: 'approved' },
          include: [
            { model: db.BusinessActivities, attributes: ['name'] },
            {
              model: db.ActivitiesOfCompany,
              attributes: ['activityId'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('ActivitiesOfCompanies.companyId'),
                    db.Op.eq,
                    db.sequelize.col('Company.id')
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
                        db.sequelize.col('ActivitiesOfCompanies.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'ActivitiesOfCompanies->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
            { model: db.CompanyTypes, attributes: ['name'] },
          ],
          order: [['coName', sortValue]],
        });
      }
    }
    if (directory && directory.length > 0) {
      return res.status(200).json({ result: directory });
    }
    return res.status(404).json({ result: [], error: 'No Company found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async searchDirectory(req, res) {
    const searchValue = req.query.searchValue.trim();
    generic.searchDirectory(searchValue, result => res.status(result[0]).send(result[1]));
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getDirectoryFilteredByType(req, res) {
    // location       | activity            | year-founded

    const { filterBy } = req.query;
    const filterValue = req.query.filterValue.trim();
    const companyType = req.params.type;
    let directory;

    if (filterBy === 'location') {
      directory = await db.Company.findAll({
        where: {
          districtBasedIn: filterValue,
          status: 'approved',
          coType: companyType,
        },
        include: [
          { model: db.BusinessActivities, attributes: ['name'] },
          {
            model: db.ActivitiesOfCompany,
            attributes: ['activityId'],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
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
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col(
                        'ActivitiesOfCompanies->BusinessActivity.id'
                      )
                    ),
                  ],
                },
              },
            ],
          },
          { model: db.CompanyTypes, attributes: ['name'] },
        ],
        order: [['createdAt', 'DESC']],
      });
    } else if (filterBy === 'activities') {
      let companiesId;
      await generic.getCompaniesIdPerActivity(
        filterValue,
        (thecompaniesId) => {
          companiesId = thecompaniesId.map(
            companyId => companyId.companyId
          );
        }
      );

      directory = await db.Company.findAll({
        where: {
          id: { [db.Op.in]: companiesId },
          status: 'approved',
          coType: companyType,
        },
        include: [
          { model: db.BusinessActivities, attributes: ['name'] },
          {
            model: db.ActivitiesOfCompany,
            attributes: ['activityId'],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
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
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col(
                        'ActivitiesOfCompanies->BusinessActivity.id'
                      )
                    ),
                  ],
                },
              },
            ],
          },
          { model: db.CompanyTypes, attributes: ['name'] },
        ],
        order: [['createdAt', 'DESC']],
      });
    } else if (filterBy === 'year-founded') {
      directory = await db.Company.findAll({
        where: {
          yearFounded: filterValue,
          status: 'approved',
          coType: companyType,
        },
        include: [
          { model: db.BusinessActivities, attributes: ['name'] },
          {
            model: db.ActivitiesOfCompany,
            attributes: ['activityId'],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
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
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col(
                        'ActivitiesOfCompanies->BusinessActivity.id'
                      )
                    ),
                  ],
                },
              },
            ],
          },
          { model: db.CompanyTypes, attributes: ['name'] },
        ],
        order: [['createdAt', 'DESC']],
      });
    }
    if (directory && directory.length > 0) {
      return res.status(200).json({ result: directory });
    }
    return res.status(404).json({ result: [], error: 'No Company found' });
  }

  /**
   *
   * @param {Oject} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getDirectorySortedByType(req, res) {
    // year-founded or names

    const { sortBy } = req.query;
    const sortValue = req.query.sortValue.trim();
    const companyType = req.params.type.trim();
    let directory;

    if (sortValue === 'desc' || sortValue === 'asc') {
      if (sortBy === 'date') {
        directory = await db.Company.findAll({
          where: { status: 'approved', coType: companyType },
          include: [
            { model: db.BusinessActivities, attributes: ['name'] },
            {
              model: db.ActivitiesOfCompany,
              attributes: ['activityId'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('ActivitiesOfCompanies.companyId'),
                    db.Op.eq,
                    db.sequelize.col('Company.id')
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
                        db.sequelize.col('ActivitiesOfCompanies.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'ActivitiesOfCompanies->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
            { model: db.CompanyTypes, attributes: ['name'] },
          ],
          order: [['yearFounded', sortValue]],
        });
      } else if (sortBy === 'name') {
        directory = await db.Company.findAll({
          where: { status: 'approved', coType: companyType },
          include: [
            { model: db.BusinessActivities, attributes: ['name'] },
            {
              model: db.ActivitiesOfCompany,
              attributes: ['activityId'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('ActivitiesOfCompanies.companyId'),
                    db.Op.eq,
                    db.sequelize.col('Company.id')
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
                        db.sequelize.col('ActivitiesOfCompanies.activityId'),
                        db.Op.eq,
                        db.sequelize.col(
                          'ActivitiesOfCompanies->BusinessActivity.id'
                        )
                      ),
                    ],
                  },
                },
              ],
            },
            { model: db.CompanyTypes, attributes: ['name'] },
          ],
          order: [['coName', sortValue]],
        });
      }
    }
    if (directory && directory.length > 0) {
      return res.status(200).json({ result: directory });
    }
    return res.status(404).json({ result: [], error: 'No Company found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async searchDirectoryByType(req, res) {
    const likeOp = db.Op.iLike;
    const searchValue = req.query.searchValue.trim();
    const companyType = req.params.type.trim();

    const directory = await db.Company.findAll({
      where: {
        [db.Op.or]: [
          { coName: { [likeOp]: `%${searchValue}%` } },
          { coType: { [likeOp]: `%${searchValue}%` } },
          { coWebsite: { [likeOp]: `%${searchValue}%` } },
          { shortDescription: { [likeOp]: `%${searchValue}%` } },
          { districtBasedIn: { [likeOp]: `%${searchValue}%` } },
          { customerBase: { [likeOp]: `%${searchValue}%` } },
          { officeAddress: { [likeOp]: `%${searchValue}%` } },
        ],
        status: 'approved',
        coType: companyType,
      },
      include: [
        { model: db.BusinessActivities, attributes: ['name'] },
        {
          model: db.ActivitiesOfCompany,
          attributes: ['activityId'],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('ActivitiesOfCompanies.companyId'),
                db.Op.eq,
                db.sequelize.col('Company.id')
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
                    db.sequelize.col('ActivitiesOfCompanies.activityId'),
                    db.Op.eq,
                    db.sequelize.col(
                      'ActivitiesOfCompanies->BusinessActivity.id'
                    )
                  ),
                ],
              },
            },
          ],
        },
        { model: db.CompanyTypes, attributes: ['name'] },
      ],
      limit: 100,
      order: [['yearFounded', 'ASC']],
    });

    if (directory && directory.length > 0) {
      return res.status(200).json({ result: directory });
    }
    return res.status(404).json({ result: [], error: 'No Company found' });
  }
}
