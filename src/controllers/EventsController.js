/* eslint-disable no-plusplus */
import db from '../models';
import generic from '../helpers/Generic';
import responseWrapper from '../helpers/responseWrapper';
import { NOT_FOUND, OK } from '../constants/statusCodes';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';

const logger = require('../helpers/LoggerMod');
/**
 * EventController Class
 */
export default class EvenController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async eventPost(req, res) {
    const { activities } = req.body;
    const fields = req.body;
    const author = req.user;
    let event;
    if (fields.eventDate) {
      if (fields.eventTime) {
        event = await db.Event.create({
          title: fields.title,
          description: fields.description,
          companyId: author.companyId,
          author: author.id,
          category: fields.category,
          eventDate: fields.eventDate,
          eventTime: fields.eventTime,
          flyer: fields.flyer,
          status: fields.status
        });
      } else {
        event = await db.Event.create({
          title: fields.title,
          description: fields.description,
          companyId: author.companyId,
          author: author.id,
          category: fields.category,
          eventDate: fields.eventDate,
          flyer: fields.flyer,
          status: fields.status
        });
      }
    } else if (fields.eventTime) {
      event = await db.Event.create({
        title: fields.title,
        description: fields.description,
        companyId: author.companyId,
        author: author.id,
        category: fields.category,
        eventTime: fields.eventTime,
        flyer: fields.flyer,
        status: fields.status
      });
    } else {
      event = await db.Event.create({
        title: fields.title,
        description: fields.description,
        companyId: author.companyId,
        author: author.id,
        category: fields.category,
        flyer: fields.flyer,
        status: fields.status
      });
    }
    if (event) {
      const activitiesToLoad = [];
      for (let i = 0; i < activities.length; i++) {
        activitiesToLoad.push({ typeOfPost: 'event', postId: event.id, activityId: activities[i] });
      }
      if (activitiesToLoad.length > 0) {
        await db.AudienceForPost.bulkCreate(activitiesToLoad);
      }

      eventEmitter.emit(events.LOG_ACTIVITY, {
        actor: req.user,
        description: `${req.user.firstName} ${req.user.lastName} created an event titled '${event.title}'`
      });
      return res.status(200).send({
        message: 'Event post saved'
      });
    }
    return res.status(404).send({
      message: 'Event posting failed'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async approveOrDeclineEventPost(req, res) {
    const { decision } = req.body;
    await db.Event.findOne({ where: { id: req.body.id, status: { [db.Op.not]: decision } }, attributes: ['id', 'title', 'description', 'flyer', 'companyId'] })
      .then((event) => {
        if (event) {
          const response = event.update({ status: decision });
          if (response) {
            if (decision === 'approved') {
              const parameters = {
                id: req.body.id, title: event.title, description: event.description, file_name: event.flyer, format: 'Event', companyId: event.companyId
              };

              eventEmitter.emit(events.NOTIFY, {
                type: 'post approval',
                parameters,
              });

              return responseWrapper({
                res,
                status: OK,
                message: 'Post approved!'
              });
            }
            res.status(200).json({ message: `Event ${decision}` });
          } else {
            res.status(404).json({ message: 'Action Failed' });
          }
        } else {
          res.status(404).json({ message: 'Event could have been already treated' });
        }
      }).catch((error) => {
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
  static async manageEventPost(req, res) {
    const { decision } = req.body;
    await db.Event.findOne({ where: { id: req.body.id, status: { [db.Op.not]: decision } }, attributes: ['id', 'title', 'description', 'flyer', 'companyId', 'messages'] })
      .then((event) => {
        if (event) {
          let response;
          if (req.body.message) {
            if (event.messages) {
              event.messages[event.messages.length] = req.body.message;
            } else {
              event.messages = [];
              event.messages[0] = req.body.message;
            }
            response = event.update({ status: decision, messages: event.messages });
          } else {
            response = event.update({ status: decision });
          }
          if (response) {
            if (decision === 'approved') {
              const parameters = {
                id: req.body.id, title: event.title, description: event.description, file_name: event.flyer, format: 'Event', companyId: event.companyId
              };

              eventEmitter.emit(events.LOG_ACTIVITY, {
                actor: req.user,
                description: `${req.user.firstName} ${req.user.lastName} approved an event titled '${event.title}'`
              });

              eventEmitter.emit(events.NOTIFY, {
                type: 'post approval',
                parameters,
              });
            }
            res.status(200).json({ message: `Event ${decision}` });
          } else {
            res.status(404).json({ message: 'Action Failed' });
          }
        } else {
          res.status(404).json({ message: 'Event could have been already treated' });
        }
      }).catch((error) => {
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
  static async getApprovedEventsList(req, res) {
    let where = { status: 'approved' };
    const {
      companyType,
      topic,
      year,
      orderType,
      orderValue,
      search,
    } = req.query;


    if (companyType) {
      let companiesId;
      await generic.getCompaniesIdPerType(companyType, (theCompanies) => {
        companiesId = theCompanies.map(company => company.id);
      });
      where = {
        ...where,
        companyId: { [db.Op.in]: companiesId },
      };
    }
    if (topic) {
      let postsId;
      await generic.getPostsIdPerActivity('event', topic, (thepostsId) => {
        postsId = thepostsId.map(postId => postId.postId);
      });
      if (postsId) {
        where = {
          ...where,
          id: { [db.Op.in]: postsId }
        };
      }
    }
    if (year) {
      where = {
        ...where,
        [db.Op.and]: db.sequelize.where(db.sequelize.literal('EXTRACT(YEAR FROM "Event"."eventDate")'), year),
      };
    }

    // manage search query
    if (search) {
      const searchValue = search.trim();
      where = {
        ...where,
        [db.Op.or]: [
          { title: { [db.Op.iLike]: `%${searchValue}%` } },
          { description: { [db.Op.iLike]: `%${searchValue}%` } },
          { category: { [db.Op.iLike]: `%${searchValue}%` } }
        ],
      };
    }
    // manage orders
    let orderT;
    if (orderType === 'title') {
      orderT = 'title';
    } else {
      orderT = 'eventDate';
    }
    const order = [[orderT, orderValue || 'DESC']];

    const eventPosts = await db.Event.findAll({
      where,
      order,
      include: [
        { model: db.Company, attributes: [['coName', 'companyName']] },
        { model: db.User, attributes: ['firstName', 'lastName'] },
        {
          model: db.AudienceForPost,
          attributes: [['activityId', 'activity']],
          on: {
            [db.Op.and]: [
              db.sequelize.where(
                db.sequelize.col('Event.id'),
                db.Op.eq,
                db.sequelize.col('AudienceForPosts.postId')
              ),
              db.sequelize.where(
                db.sequelize.col('AudienceForPosts.typeOfPost'),
                db.Op.eq,
                'event'
              )
            ],
          },
          include: [{
            model: db.BusinessActivities,
            attributes: ['name'],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.activityId'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                )],
            },
          }]
        }
      ],
    });
    if (eventPosts && eventPosts.length > 0) {
      return res.status(200).json({
        result: eventPosts,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No event found at this moment',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getEventsListPerCompany(req, res) {
    const eventPosts = await db.Event
      .findAll({
        where: {
          companyId: req.params.companyId,
          status: {
            [db.Op.not]: 'deleted'
          },
        },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('Event.id'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts.postId')
                ),
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.typeOfPost'),
                  db.Op.eq,
                  'event'
                )
              ],
            },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.activityId'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                  )],
              },
            }]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
    if (eventPosts && eventPosts.length > 0) {
      return res.status(200).json({
        result: eventPosts,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No Event Posts found',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getEventsList(req, res) {
    let eventPosts;
    if (req.params.status === 'all') {
      eventPosts = await db.Event
        .findAll({
          include: [
            { model: db.Company, attributes: [['coName', 'companyName']] },
            { model: db.User, attributes: ['firstName', 'lastName'] },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Event.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'event'
                  )
                ],
              },
              include: [{
                model: db.BusinessActivities,
                attributes: ['name'],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.activityId'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                    )],
                },
              }]
            }
          ],
          order: [['createdAt', 'DESC']]
        });
    } else {
      eventPosts = await db.Event
        .findAll({
          where: {
            status: req.params.status,
          },
          include: [
            { model: db.Company, attributes: [['coName', 'companyName']] },
            { model: db.User, attributes: ['firstName', 'lastName'] },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Event.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'event'
                  )
                ],
              },
              include: [{
                model: db.BusinessActivities,
                attributes: ['name'],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.activityId'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                    )],
                },
              }]
            }
          ],
          order: [['createdAt', 'DESC']]
        });
    }
    if (eventPosts && eventPosts.length > 0) {
      return res.status(200).json({
        result: eventPosts,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No Event Posts found',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getEventInfo(req, res) {
    const event = await db.Event
      .findOne({
        where: {
          id: req.params.eventId,
        },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('Event.id'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts.postId')
                ),
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.typeOfPost'),
                  db.Op.eq,
                  'event'
                )
              ],
            },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.activityId'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                  )],
              },
            }]
          }
        ],
      });

    return event ? responseWrapper({
      res,
      status: OK,
      result: event,
    }) : responseWrapper({
      res,
      status: NOT_FOUND,
      message: 'Event not found'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editEventInfo(req, res) {
    const foundEvent = await db.Event.findOne({
      where: {
        id: req.body.id
      }
    });

    if (!foundEvent) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Event not found'
      });
    }

    await foundEvent.update({ ...req.body });

    return responseWrapper({
      res,
      status: OK,
      message: 'Event has been edited successfully!'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async deleteEvent(req, res) {
    const foundEvent = await db.Event.findOne({
      where: {
        id: req.query.eventId,
      }
    });

    if (!foundEvent) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Event not found'
      });
    }

    await foundEvent.update({
      status: 'deleted'
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} deleted an event titled '${foundEvent.title}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Event has been deleted!'
    });
  }

  /**
   *
   * @param {Oject} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getEventsFiltered(req, res) {
    const { filterBy } = req.query;
    const filterValue = req.query.filterValue.trim();
    let eventPosts;
    if (filterBy === 'company') {
      eventPosts = await db.Event.findAll({
        where: { companyId: filterValue, status: 'approved' },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
            }]
          }
        ],
        order: [['eventDate', 'DESC']]
      });
    } else if (filterBy === 'company-type') {
      let companiesId;
      await generic.getCompaniesIdPerType(filterValue, (theCompanies) => {
        companiesId = theCompanies.map(company => company.id);
      });
      eventPosts = await db.Event.findAll({
        where: { companyId: { [db.Op.in]: companiesId }, status: 'approved' },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
            }]
          }
        ],
        order: [['eventDate', 'DESC']]
      });
    } else if (filterBy === 'topic') {
      let eventsId;
      await generic.getPostsIdPerActivity('event', filterValue, (theEventsId) => {
        eventsId = theEventsId.map(postId => postId.postId);
      });
      eventPosts = await db.Event.findAll({
        where: { id: { [db.Op.in]: eventsId }, status: 'approved' },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
            }]
          }
        ],
        order: [['eventDate', 'DESC']]
      });
    } else if (filterBy === 'year') {
      eventPosts = await db.Event.findAll({
        where: { status: 'approved', andOp: db.sequelize.where(db.sequelize.literal('EXTRACT(YEAR FROM "Event"."eventDate")'), filterValue) },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
            }]
          }
        ],
        order: [['updatedAt', 'DESC']]
      });
    }

    if (eventPosts && eventPosts.length > 0) {
      return res.status(200).json({ result: eventPosts });
    }
    return res.status(404).json({ result: [], error: 'No Event Posts found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getEventsSorted(req, res) {
    const { sortBy } = req.query;
    const sortValue = req.query.sortValue.trim();
    let eventPosts;

    if (sortBy === 'date') {
      if (sortValue === 'desc' || sortValue === 'asc') {
        eventPosts = await db.Event.findAll({
          where: { status: 'approved' },
          include: [
            { model: db.Company, attributes: [['coName', 'companyName']] },
            { model: db.User, attributes: ['firstName', 'lastName'] },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
              include: [{
                model: db.BusinessActivities,
                attributes: ['name'],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            }
          ],
          order: [['eventDate', sortValue]]
        });
      }
    } else if (sortBy === 'title') {
      if (sortValue === 'desc' || sortValue === 'asc') {
        eventPosts = await db.Event.findAll({
          where: { status: 'approved' },
          include: [
            { model: db.Company, attributes: [['coName', 'companyName']] },
            { model: db.User, attributes: ['firstName', 'lastName'] },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')], },
              include: [{
                model: db.BusinessActivities,
                attributes: ['name'],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            }
          ],
          order: [['title', sortValue]]
        });
      }
    }

    if (eventPosts && eventPosts.length > 0) {
      return res.status(200).json({ result: eventPosts });
    }
    return res.status(404).json({ result: [], error: 'No Event Posts found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async searchForEvents(req, res) {
    const searchValue = req.query.searchValue.trim();
    generic.searchForEvents(searchValue, result => res.status(result[0]).send(result[1]));
  }
}
