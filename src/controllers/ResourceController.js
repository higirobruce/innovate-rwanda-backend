import { NOT_FOUND, OK } from '../constants/statusCodes';
import responseWrapper from '../helpers/responseWrapper';
import db from '../models';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';

/**
 * Resource Controller Class
 */
export default class ResourceController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getResources(req, res) {
    const response = await db.Resource.findAll({ order: [['title', 'ASC']] });
    return res.status(200).json({ result: response });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getResource(req, res) {
    const response = await db.Resource.findOne({
      where: {
        id: req.params.id
      },
      raw: true
    });
    return res.status(200).json({ result: response });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async addResource(req, res) {
    const response = await db.Resource.create(
      {
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        file: req.body.file,
      }
    );

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} created a resource titled '${response.title}'`
    });

    return res.status(200).send({ message: response });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editResource(req, res) {
    const foundResource = await db.Resource.findByPk(req.body.id);
    if (!foundResource) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Resource not found',
      });
    }

    await foundResource.update({ ...req.body, id: undefined });


    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} updated a resource titled '${foundResource.title}'`
    });
    return responseWrapper({
      res,
      status: OK,
      message: 'Resource updated'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async removeResource(req, res) {
    const foundResource = await db.Resource.findByPk(req.query.resourceId);
    if (!foundResource) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Resource not found',
      });
    }

    await foundResource.destroy();

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} deleted a resource titled '${foundResource.title}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Resource deleted'
    });
  }
}
