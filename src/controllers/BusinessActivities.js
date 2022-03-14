import db from '../models';


import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';
import responseWrapper from '../helpers/responseWrapper';
import { NOT_FOUND, OK } from '../constants/statusCodes';


/**
 * Business Activity Controller
 */
export default class BusinessActivities {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getBusinessActivities(req, res) {
    const response = await db.BusinessActivities.findAll({ order: [['name', 'ASC']] });
    return res.status(200).json({ result: response });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async addActivity(req, res) {
    const response = await db.BusinessActivities.create(req.body);

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} created a new business activity named '${response.name}'`
    });
    return res.status(200).send({ message: response });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editActivity(req, res) {
    const foundActivity = await db.BusinessActivities.findByPk(req.body.id);
    if (!foundActivity) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Business activity not found'
      });
    }

    await foundActivity.update({
      ...req.body,
      id: undefined,
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} updated a business activity named '${foundActivity.name}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Business activity updated'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async removeActivity(req, res) {
    const { activityId } = req.query;

    const foundActivity = await db.BusinessActivities.findByPk(activityId);
    if (!foundActivity) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Business activity does not exist'
      });
    }

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} removed a business activity named '${foundActivity.name}'`
    });
    await foundActivity.destroy();

    await db.ActivitiesOfCompany.destroy({
      where: { activityId }
    });

    await db.AudienceForPost.destroy({
      where: { activityId }
    });

    await db.Company.update(
      { businessActivityId: null }, { where: { businessActivityId: activityId } }
    );

    return responseWrapper({
      res,
      status: OK,
      message: 'Business activity removed'
    });
  }
}
