import db from '../models';


import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';
import responseWrapper from '../helpers/responseWrapper';
import { NOT_FOUND, OK } from '../constants/statusCodes';

const logger = require('../helpers/LoggerMod');

/**
 * CompanyCategories Class controller
 */
export default class CompanyCategories {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getCompanyCategories(req, res) {
    try {
      const response = await db.CompanyCategories.findAll({ order: [['name', 'ASC']] });
      return res.status(200).json({ result: response });
    } catch (error) {
      logger.customLogger.log('error', error);
      return res.status(400).send({ message: 'Sorry, no company categories found' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async addCategory(req, res) {
    const response = await db.CompanyCategories.create(req.body);

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} created a company category named '${response.name}'`
    });
    return res.status(200).send({ message: response });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editCategory(req, res) {
    const foundCategory = await db.CompanyCategories.findByPk(req.body.id);
    if (!foundCategory) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Company category does not exist'
      });
    }

    await foundCategory.update({
      ...req.body,
      id: undefined,
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} updated a company category named '${foundCategory.name}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Company category has been updated'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async removeCategory(req, res) {
    const foundCategory = await db.CompanyCategories.findByPk(req.query.categoryId);
    if (!foundCategory) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Company category not found',
      });
    }

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} removed a company category named '${foundCategory.name}'`
    });

    await foundCategory.destroy();


    return responseWrapper({
      res,
      status: OK,
      message: 'Category removed'
    });
  }
}
