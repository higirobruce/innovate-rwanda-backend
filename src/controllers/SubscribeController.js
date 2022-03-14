
import db from '../models';
import notification from '../helpers/Notification';
import responseWrapper from '../helpers/responseWrapper';
import { CONFLICT, NOT_FOUND, OK } from '../constants/statusCodes';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';

/**
 * Subscribe Controller class
 */
export default class SubscribeController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async subscribeToNotification(req, res) {
    const foundSub = await db.Subbscription.findOne({
      where: {
        email: req.body.email
      },
    });

    if (foundSub) {
      return responseWrapper({
        res,
        status: CONFLICT,
        message: 'You are already subscribed',
      });
    }
    db.Subscription.create({ email: req.body.email, status: 'active' }).then((subscription) => {
      if (subscription) {
        eventEmitter.emit(events.LOG_ACTIVITY, {
          actor: { id: 0 },
          description: `A user with the email '${req.body.email}' subscribed to the newsletter`
        });
        notification.notify('subscribe', { email: subscription.email }, response => res.status(200).json({ message: response }));
      } else {
        return res.status(401).json({ message: 'Sorry, subscription failed, try later' });
      }
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async unsubscribeFromNotification(req, res) {
    const sub = await db.Subscription.findOne({
      where: { email: req.params.email.trim() }
    });

    if (!sub) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'You are not subscribed to email notifications'
      });
    }

    await sub.destroy();

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: { id: 0 },
      description: `A user with the email '${req.params.email}' unsubscribed to the newsletter`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Successfully unsubscribed'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getSubscriptions(req, res) {
    const subs = await db.Subscription.findAll({ order: [['updatedAt', 'DESC']], attributes: { exclude: ['createdAt', 'updatedAt'] } });


    return responseWrapper({
      res,
      status: OK,
      result: subs,
    });
  }
}
