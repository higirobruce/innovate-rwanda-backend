import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UniqueConstraintError } from 'sequelize';
import db from '../models';
import generic from '../helpers/Generic';
import logger from '../helpers/LoggerMod';
import responseWrapper from '../helpers/responseWrapper';
import {
  NOT_FOUND, OK, UNAUTHORIZED, CONFLICT
} from '../constants/statusCodes';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';

// const logger = require('../helpers/LoggerMod.js');

const saltRounds = 10;

/**
 * UserController Class
 */
export default class UserController {
  /**
   *
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Promise} - Promise
   */
  static async getUsersList(req, res) {
    const users = await db.User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'jobTitle',
        'role',
        'companyId',
        'status',
        'lastActivity',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.Company,
          as: 'company',
          required: false,
        }
      ]
    });
    return responseWrapper({
      res,
      status: OK,
      result: users,
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} - Response
   */
  static async getUserProfile(req, res) {
    const user = await db.User.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ['password', 'companyId', 'resetLink', 'lastActivity'],
      },
    });

    if (!user) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        error: "Profile doesn't exist",
      });
    }

    return responseWrapper({
      res,
      status: OK,
      result: user,
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} - Response
   */
  static async createIndividualAccount(req, res) {
    try {
      await db.sequelize.transaction(async (t) => {
        await db.Individual.create(
          {
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            accType: req.body.accType,
            shortDescription: req.body.shortDescription,
            location: req.body.location,
            portfolio: req.body.portfolio,
            linkedin: req.body.linkedin,
            slug: generic.generateSlug(
              `${req.body.lastName} ${req.body.firstName}`
            ),
            contactEmail: req.body.email.trim(),
            emailDisplay: false,
            contactPhone: req.body.phone,
            phoneDisplay: false,
            status: 'pending',
          },
          { transaction: t }
        )
          .then((individual) => {
            const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
            const token = jwt.sign(
              { _id: req.body.email },
              process.env.ACCOUNT_ACTIVATION_KEY,
              {}
            );

            db.User.create(
              {
                firstName: individual.firstName,
                lastName: individual.lastName,
                email: individual.contactEmail,
                jobTitle: req.body.profession,
                password: hashPassword,
                role: 'individual',
                resetLink: token,
                status: 'pending',
              },
              { transaction: t }
            )
              .then((user) => {
                individual.update({ user_id: user.id });
                const parameters = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  token,
                };
                eventEmitter.emit(events.NOTIFY, {
                  type: 'registration',
                  parameters,
                });

                return responseWrapper({
                  res,
                  status: 200,
                  message: 'An account has been created'
                });
              })
              .catch((error) => {
                logger.customLogger.log('error', error);
                if (error instanceof UniqueConstraintError) {
                  return res.status(409).send({
                    error:
                      'Email already used for a registration on the system, Please use a different email',
                    field: error.errors[0].path,
                  });
                }
                return res
                  .status(401)
                  .send({
                    message:
                      'Please confirm you provided all required info then try again',
                  });
              });
          })
          .catch((error) => {
            logger.customLogger.log('error', error);
            if (error instanceof UniqueConstraintError) {
              return res.status(409).send({
                error: 'The individual is already registered on the system',
                field: error.errors[0].path,
              });
            }
            return res.status(401).send({
              message:
                'Please confirm you provided all required info then try again',
            });
          });
      });
    } catch (error) {
      logger.customLogger.log('error', error);
      // console.log(error)
      return res.status(401).send({ error: 'Error occurred!!!!' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async createCompanyAccount(req, res) {
    console.log('COMPANY');

    await db.sequelize.transaction(async (t) => {
      await db.Company.create(
        {
          coName: req.body.coName,
          coType: req.body.coType,
          coWebsite: req.body.coWebsite,
          districtBasedIn: req.body.districtBasedIn,
          businessActivityId: req.body.businessActivityId,
          shortDescription: req.body.shortDescription,
          slug: generic.generateSlug(req.body.coName),
          contactEmail: req.body.email,
          emailDisplay: false,
          status: 'in_editing',
        },
        { transaction: t }
      )
        .then((company) => {
          db.ActivitiesOfCompany.create(
            {
              activityId: req.body.businessActivityId,
              companyId: company.id,
            },
            { transaction: t }
          );

          const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
          const token = jwt.sign(
            { _id: req.body.email },
            process.env.ACCOUNT_ACTIVATION_KEY,
            {}
          );

          db.User.create(
            {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              jobTitle: req.body.jobTitle,
              password: hashPassword,
              role: req.body.role,
              resetLink: token,
              companyId: company.id,
              status: 'pending',
            },
            { transaction: t }
          )
            .then((user) => {
              const parameters = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
              };
              eventEmitter.emit(events.NOTIFY, {
                type: 'registration',
                parameters,
              });

              return responseWrapper({
                res,
                status: 200,
                message: 'An account has been created'
              });
            })
            .catch((error) => {
              logger.customLogger.log('error', error);
              if (error instanceof UniqueConstraintError) {
                return res.status(409).send({
                  error:
                      'Email already used for a company on the system, Please use a different email',
                  field: error.errors[0].path,
                });
              }
              return res
                .status(401)
                .send({
                  message:
                      'Please confirm you provided all required info then try again',
                });
            });
        })
        .catch((error) => {
          console.log('Errrr', error);
          logger.customLogger.log('error', error);
          if (error instanceof UniqueConstraintError) {
            return res.status(409).send({
              error: 'The company is already registered on the system',
              field: error.errors[0].path,
            });
          }
          return res.status(401).send({
            message:
                'Please confirm you provided all required info then try again',
          });
        });
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async register(req, res) {
    try {
      if (
        req.body
        && req.body.entity_type
        && req.body.entity_type === 'individual'
      ) {
        return UserController.createIndividualAccount(req, res);
      }
      return UserController.createCompanyAccount(req, res);
    } catch (error) {
      logger.customLogger.log('error', error);
      return res.status(401).send({ error: 'Error occurred' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async createUser(req, res) {
    const hashPassword = bcrypt.hashSync(
      req.body.password.trim(),
      saltRounds
    );

    const foundUser = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (foundUser) {
      return responseWrapper({
        res,
        status: CONFLICT,
        message: 'A user with such an email exists'
      });
    }

    const user = await db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.trim(),
      password: hashPassword,
      role: req.body.role,
      status: 'active',
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} created a user with an email '${user.email}'`,
    });

    eventEmitter.emit(events.NOTIFY, {
      type: 'admin account creation',
      parameters: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: req.body.password,
      },
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'User account has been created'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next - Next Function
   * @returns {Object} - Response or Next Function
   */
  static async login(req, res, next) {
    await db.User.findOne({
      where: { email: req.body.email.trim() },
    })
      .then((user) => {
        if (!user) {
          return res
            .status(403)
            .send({
              message:
                'Invalid email or Account not activated, check your email',
            });
        }
        if (user.status !== 'active') {
          return res
            .status(403)
            .send({
              message:
                "You haven't activated your account, or the account is not active; please check email for activation link",
            });
        }
        if (!user.lastActivity && user.role === 'normal') {
          eventEmitter.emit(events.NOTIFY, {
            type: 'first login',
            parameters: {
              firstName: user.firstName,
              lastName: user.lastName,
              companyId: user.companyId,
            },
          });
        }
        user.update({ lastActivity: db.sequelize.fn('NOW') });
        bcrypt.compare(req.body.password, user.password, (error, result) => {
          if (result) {
            db.Company.findOne({
              where: { id: user.companyId },
            })
              .then((company) => {
                delete user.dataValues.password;
                res.locals.user = user;
                if (!company) {
                  res.locals.companyInfo = 'Company info not there';
                } else {
                  res.locals.companyInfo = company;
                }

                eventEmitter.emit(events.LOG_ACTIVITY, {
                  actor: user.get(),
                  description: `${user.firstName} ${user.lastName} logged in`
                });
                next();
              })
              .catch((err) => {
                logger.customLogger.log('error', err);
                res
                  .status(403)
                  .send({ message: 'Error - company info not got' });
              });
          } else {
            console.log(error);
            res.status(403).send({ message: 'Wrong Password' });
          }
        });
      })
      .catch((error) => {
        logger.customLogger.log('error', error);
        // console.log("err", errr)
        res.status(401).send({ message: 'Error occurred' });
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async changePassword(req, res) {
    try {
      bcrypt.hash(req.body.password, saltRounds, (err, hashPassword) => {
        if (hashPassword) {
          const response = db.User.update(
            { password: hashPassword },
            {
              where: {
                email: req.body.email,
              },
            }
          );
          return res.status(200).json({
            message: response,
          });
        }
        return res.status(200).json({
          message: 'Sorry, change of password failed.',
        });
      });
    } catch (error) {
      logger.customLogger.log('error', error);
      return res
        .status(400)
        .send({ message: 'Sorry, change of password failed.' });
    }
  }

  /**
   *
   * @param {Oject} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async forgotPassword(req, res) {
    const { email } = req.body;

    await db.User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ error: 'User with this email does not exist' });
        }
        const token = jwt.sign(
          { _id: user.id },
          process.env.RESET_PASSWORD_KEY,
          { expiresIn: '1h' }
        );

        if (token) {
          user
            .update({ resetLink: token })
            .then((result) => {
              if (result) {
                eventEmitter.emit(events.NOTIFY, {
                  type: 'forgot password',
                  parameters: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token,
                  },
                });

                return responseWrapper({
                  res,
                  status: 200,
                  message: 'Email is sent, Check your email for the link'
                });
              }
              return res.status(404).send({ message: 'Please try again' });
            })
            .catch((error) => {
              logger.customLogger.log('error', error);
              return res
                .status(400)
                .json({
                  error:
                    'Please confirm that the email is right, Try again later',
                });
            });
        } else {
          return res.status(400).json({ error: 'Please try again later' });
        }
      })
      .catch((error) => {
        logger.customLogger.log('error', error);
        return res.status(400).json({ error: 'Please try again later' });
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async resetPassword(req, res) {
    const { resetLink } = req.params;
    const { newPassword } = req.body;

    if (resetLink) {
      jwt.verify(
        resetLink,
        process.env.RESET_PASSWORD_KEY,
        (error, decoded) => {
          console.log({ decoded });
          if (error) {
            return res
              .status(401)
              .send({ message: 'Incorrect token or The link expired' });
          }
          const user = db.User.findOne({ where: { resetLink } });

          if (!user) {
            return responseWrapper({
              res,
              status: NOT_FOUND,
              error: 'User with that link does not exist',
            });
          }
          bcrypt.hash(newPassword, saltRounds, (err, hashPassword) => {
            if (hashPassword) {
              const response = db.User.update(
                {
                  password: hashPassword,
                  resetLink: null,
                },
                { where: { resetLink } }
              );

              if (response) {
                return res.status(200).send({ message: 'password reset' });
              }
              return res.status(404).send({ message: 'reset failed' });
            }
            return res
              .status(401)
              .json({ message: 'Sorry, change of password failed.' });
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
  static async deactivateUser(req, res) {
    const foundUser = await db.User.findOne({
      where: {
        email: req.params.email,
      },
    });

    if (!foundUser) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'User not found'
      });
    }

    await foundUser.update({ status: 'inactive' });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} deactivated a user with email '${foundUser.email}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'A user has been deactivated',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async activateUser(req, res) {
    const foundUser = await db.User.findOne({
      where: {
        email: req.params.email,
      },
    });

    if (!foundUser) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'The user you want to activate is not found',
      });
    }

    await foundUser.update({
      status: 'active',
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} activated a user with email '${foundUser.email}'`
    });

    await foundUser.reload();

    return responseWrapper({
      res,
      status: OK,
      message: 'The user has been activated',
      result: {
        ...foundUser.get(),
      },
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async activateAccount(req, res) {
    try {
      const { activationLink } = req.params;
      if (activationLink) {
        jwt.verify(
          activationLink,
          process.env.ACCOUNT_ACTIVATION_KEY,
          (error, decoded) => {
            console.log({ decoded });
            if (error) {
              return responseWrapper({
                res,
                status: UNAUTHORIZED,
                message: 'Incorrect link or The link expired',
              });
            }
          }
        );

        await db.User.findOne({
          where: { resetLink: activationLink },
          attributes: ['id', 'email', 'role'],
        })
          .then((user) => {
            if (!user) {
              return res
                .status(400)
                .json({ error: 'Your account is already activated' });
            }
            if (user.role === 'individual') {
              db.Individual.update(
                { status: 'active' },
                { where: { contactEmail: user.email } }
              );
            }
            user.update({ status: 'active', resetLink: null });
            eventEmitter.emit(events.NOTIFY, {
              type: 'account activation',
              parameters: {
                email: user.email,
              }
            });

            return responseWrapper({
              res,
              status: 200,
              message: 'Account Activated. A confirmation is sent to your email'
            });
          })
          .catch((error) => {
            logger.customLogger.log('error', error);
            // console.log(errr)
            return res
              .status(401)
              .json({ error: 'Activation Error, try later' });
          });
      } else {
        return res.status(401).json({ error: 'Activation Link not privided' });
      }
    } catch (error) {
      logger.customLogger.log('error', error);
      return res.status(400).json({ error: 'Activation Error' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async resendAccountActivationLink(req, res) {
    try {
      const { userEmail } = req.body;

      await db.User.findOne({
        where: { email: userEmail },
        attributes: {
          exclude: ['password', 'resetLink'],
        },
      })
        .then((user) => {
          if (!user) {
            return res
              .status(400)
              .json({
                error:
                  'The provided email is not linked to an existing account!!!',
              });
          }
          if (user.status === 'pending') {
            const token = jwt.sign(
              { _id: userEmail },
              process.env.ACCOUNT_ACTIVATION_KEY,
              {}
            );
            const response = user.update({ resetLink: token });
            if (response) {
              const parameters = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
              };

              eventEmitter.emit(events.NOTIFY, {
                type: 'account activation link resubmission',
                parameters,
              });

              return responseWrapper({
                res,
                status: OK,
                message: `Activation Link sent to ${user.email}`
              });
            } return res
              .status(200)
              .json({
                message:
                ' Activation Link Resubmission Error, try again later',
              });
          }
          return res
            .status(200)
            .json({
              message:
                  'The account linked to provided email is no longer pending!!!',
            });
        })
        .catch((error) => {
          logger.customLogger.log('error', error);
          // console.log(errr)
          return res.status(401).json({ error: 'Activation Error, try later' });
        });
    } catch (error) {
      logger.customLogger.log('error', error);
      return res
        .status(400)
        .json({ error: 'Activation Link Resubmission Error' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async changeRole(req, res) {
    const foundUser = await db.User.findByPk(req.params.userId);
    if (!foundUser) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'A user does not exist',
      });
    }

    await foundUser.update({
      role: req.body.role,
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} ${req.user.lastName} changed a role of a user with email '${foundUser.email}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'A user role has been updated'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async searchForUsers(req, res) {
    const likeOp = db.Op.iLike;
    const searchValue = req.query.searchValue.trim();

    const messages = await db.User.findAll({
      where: {
        [db.Op.or]: [
          { firstName: { [likeOp]: `%${searchValue}%` } },
          { lastName: { [likeOp]: `%${searchValue}%` } },
          { email: { [likeOp]: `%${searchValue}%` } },
          { jobTitle: { [likeOp]: `%${searchValue}%` } },
          { role: { [likeOp]: `%${searchValue}%` } },
        ],
      },
      attributes: {
        exclude: ['password', 'resetLink'],
      },
      limit: 10,
      order: [['createdAt', 'DESC']],
    });

    if (messages && messages.length > 0) {
      return responseWrapper({
        res,
        status: OK,
        result: messages,
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editProfile(req, res) {
    const { body, user } = req;

    if (Object.keys(body).length === 0) {
      return responseWrapper({
        res,
        status: OK,
        result: req.user,
        message: 'Nothing to update',
      });
    }
    await db.User.update(
      {
        ...body,
      },
      { where: { id: user.id } }
    );

    return responseWrapper({
      res,
      status: OK,
      message: 'Profile is successfully updated',
    });
  }
}
