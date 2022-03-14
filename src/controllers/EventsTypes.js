import db from '../models';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';
import responseWrapper from '../helpers/responseWrapper';
import { NOT_FOUND, OK } from '../constants/statusCodes';

/**
 * Event Type Controller
 */
export default class EventsTypes {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getEventsTypes(req, res) {
    const response = await db.EventsTypes.findAll({ order: [['name', 'ASC']] });
    return res.status(200).json({ result: response });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async addType(req, res) {
    const response = await db.EventsTypes.create(req.body);
    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} added an event type named '${response.name}'`
    });
    return res.status(200).send({ message: response });
  }


  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editType(req, res) {
    const foundType = await db.EventsTypes.findByPk(req.body.id);

    if (!foundType) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Event Type not found'
      });
    }

    await foundType.update({
      ...req.body,
      id: undefined,
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} updated an event type named '${foundType.name}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Event Type updated'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async removeType(req, res) {
    const foundType = await db.EventsTypes.findByPk(req.query.type);

    if (!foundType) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Event Type not found'
      });
    }

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} deleted an event type named '${foundType.name}'`
    });

    await foundType.destroy();

    return responseWrapper({
      res,
      status: OK,
      message: 'Event Type  has been removed'
    });
  }
}
