import db from '../models';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';
import responseWrapper from '../helpers/responseWrapper';
import { NOT_FOUND, OK } from '../constants/statusCodes';


/**
 * Resource Type Class
 */
export default class ResourcesTypes {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getResourcesTypes(req, res) {
    const response = await db.ResourcesTypes.findAll({ order: [['name', 'ASC']] });
    return res.status(200).json({ result: response });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async addType(req, res) {
    const response = await db.ResourcesTypes.create({
      name: req.body.name,
      description: req.body.description,
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} added a resource type named '${response.name}'`
    });
    return res.status(200).send({ message: response, result: response });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editType(req, res) {
    const foundType = await db.ResourcesTypes.findByPk(req.body.id);
    if (!foundType) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Resource type is not found',
      });
    }

    await foundType.update({
      ...req.body,
      id: undefined,
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Resource type is updated'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async removeType(req, res) {
    const foundType = await db.ResourcesTypes.findByPk(req.query.type);

    if (!foundType) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Resource type is not found',
      });
    }

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} updated a resource type named '${foundType.name}'`
    });

    await foundType.destroy();

    return responseWrapper({
      res,
      status: OK,
      message: 'Resource type removed'
    });
  }
}
