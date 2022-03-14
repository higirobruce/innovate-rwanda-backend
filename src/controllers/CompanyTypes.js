import db from '../models';
import generic from '../helpers/Generic';


import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';
import responseWrapper from '../helpers/responseWrapper';
import { CONFLICT, NOT_FOUND, OK } from '../constants/statusCodes';

const logger = require('../helpers/LoggerMod');

/**
 * CompanyTypes class
 */
export default class CompanyTypes {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getCompanyTypes(req, res) {
    try {
      const response = await db.CompanyTypes.findAll({ order: [['display_order', 'ASC'], ['slug', 'ASC']] });
      return res.status(200).json({ result: response });
    } catch (error) {
      logger.customLogger.log('error', error);
      // console.log(err)
      return res.status(400).send({ message: 'Sorry, no company types found' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async addType(req, res) {
    const foundType = await db.CompanyTypes.findOne({
      where: {
        name: req.body.name
      }
    });

    if (foundType) {
      return responseWrapper({
        res,
        status: CONFLICT,
        message: 'This company type already exists'
      });
    }
    const response = await db.CompanyTypes.create({
      name: req.body.name,
      description: req.body.description,
      slug: generic.generateSlug_companyTypes(req.body.name),
      image: req.body.image
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} added a company type named '${response.name}'`,
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
    const foundType = await db.CompanyTypes.findByPk(req.body.id);
    if (!foundType) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Company type not found'
      });
    }

    await foundType.update({
      ...req.body,
      id: undefined,
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} updated the company type named '${foundType.name}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Company type updated'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async removeType(req, res) {
    const foundType = await db.CompanyTypes.findOne({
      where: {
        id: req.query.type
      }
    });

    if (!foundType) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Company type not found'
      });
    }

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} deleted a company type named '${foundType.name}'`
    });

    await foundType.destroy();

    return responseWrapper({
      res,
      status: OK,
      message: 'Company type has been deleted'
    });
  }
}
