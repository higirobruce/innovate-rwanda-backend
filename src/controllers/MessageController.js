import { Op } from 'sequelize';
/* eslint-disable max-len */
import db from '../models';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';
import responseWrapper from '../helpers/responseWrapper';
import { NOT_FOUND, OK } from '../constants/statusCodes';

/**
 * MessageController Class
 */
export default class MessageController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async messagePost(req, res) {
    const message = await db.Message.create(req.body);
    if (message) {
      eventEmitter.emit(events.NOTIFY, {
        type: 'message post',
        parameters: { email: message.email, companyId: message.companyId, message: message.message }
      });
    }


    return responseWrapper({
      res,
      status: OK,
      message: 'Message Sent'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getMessagesListPerCompany(req, res) {
    const messages = await db.Message
      .findAll({
        where: {
          companyId: req.params.companyId, // confirm ok getting companyId of logged in user instead of this
        },
        order: [['createdAt', 'DESC']]
      });
    if (messages && messages.length > 0) {
      return res.status(200).json({
        result: messages,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No Message found',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getMessageInfo(req, res) {
    const message = await db.Message
      .findOne({
        where: {
          id: req.params.messageId,
        },
        raw: true,
      });
    return message
      ? res.status(200).json({
        result: message
      })
      : res.status(404).json({
        error: 'Sorry, Message not found',
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async searchForMessages(req, res) {
    const likeOp = db.Op.iLike;
    const searchValue = req.query.searchValue.trim();

    const messages = await db.Message
      .findAll({
        attributes: ['id', 'email', 'message'],
        where: {
          companyId: req.user.companyId,
          [db.Op.or]: [
            { email: { [likeOp]: `%${searchValue}%` } },
            { message: { [likeOp]: `%${searchValue}%` } }
          ],
        },
        limit: 10,
        order: [['createdAt', 'DESC']]
      });
    if (messages && messages.length > 0) {
      return res.status(200).json({
        result: messages,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No Message found',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response object
   */
  static async setRead(req, res) {
    const messagesId = req.body.messages.split(',').map(Number);
    const response = await db.Message.update(
      { firstread: db.sequelize.fn('NOW') },
      { where: { id: { [db.Op.in]: messagesId } } }
    );
    if (response) {
      return res.status(200).json({
        message: 'marked as read'
      });
    }
    return res.status(404).json({
      message: 'Message not found'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getAllMessages(req, res) {
    const { page = 1, limit = 50, companyId } = req.query;

    const offset = limit * (page - 1);

    const filter = {};

    if (companyId) {
      filter.companyId = companyId;
    }

    const messages = await db.Message.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.Company,
          as: 'company',
          required: true
        }
      ],
      ...filter,
    });

    const total = messages.count;
    const pages = Math.ceil(total / limit);

    const meta = {
      total,
      page,
      pages
    };

    return responseWrapper({
      res,
      status: OK,
      data: messages.rows,
      meta,
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async sendMessage(req, res) {
    const { body } = req;
    /**
     *
     * - companyId
     * - recipientId
     * - message
     *
     *
     */

    const foundCompany = await db.Company.findByPk(body.companyId);

    if (!foundCompany) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Company not found'
      });
    }

    const newMessage = await db.Message.create({
      ...body,
      userId: req.user.id,
    });

    await db.UserMessage.create({
      lastMessageId: newMessage.id,
      userId: req.user.id,
      recipientId: body.recipientId,
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Message sent!',
      data: newMessage
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response
   */
  static async getMessageHistory(req, res) {
    const { user } = req;

    const filter = {};

    filter[Op.or] = [];

    filter[Op.or].push({
      userId: user.id,
    });

    filter[Op.or].push({
      recipientId: user.id
    });

    const messageHistory = await db.UserMessage.findAll({
      where: {
        ...filter,
      },
      include: [
        {
          model: db.Message,
          as: 'lastMessage',
          required: true,
          order: [['createdAt', 'DESC']],

        }
      ]
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Message history retrieved',
      data: messageHistory
    });
  }
}
