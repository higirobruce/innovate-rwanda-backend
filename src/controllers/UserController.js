import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UniqueConstraintError } from 'sequelize';
import db from '../models';
import generic from '../helpers/Generic';
import notification from '../helpers/Notification';
import logger from '../helpers/LoggerMod';
import responseWrapper from '../helpers/responseWrapper';
import { NOT_FOUND, OK, UNAUTHORIZED } from '../constants/statusCodes';

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
            accType: req.body.accountType,
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
                notification.notify('registration', parameters, response => res.status(200).json({ message: response }));
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
    try {
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
                notification.notify('registration', parameters, response => res.status(200).json({ message: response }));
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
    try {
      const hashPassword = bcrypt.hashSync(
        req.body.password.trim(),
        saltRounds
      );

      const user = await db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.trim(),
        password: hashPassword,
        role: req.body.role,
        status: 'active',
      });

      notification.notify(
        'admin account creation',
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: req.body.password,
        },
        response => res
          .status(200)
          .json({ message: `User Account created successfully. ${response}` })
      );
    } catch (error) {
      logger.customLogger.log('error', error);
      // console.log(error)
      if (error instanceof UniqueConstraintError) {
        return res.status(409).send({
          error: 'User with this email already exists',
          field: error.errors[0].path,
        });
      }
      return res
        .status(400)
        .send({ message: 'Error occurred, Please try again later' });
    }
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
          notification.notify(
            'first login',
            {
              firstName: user.firstName,
              lastName: user.lastName,
              companyId: user.companyId,
            },
            () => {}
          );
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
                notification.notify(
                  'forgot password',
                  {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token,
                  },
                  response => res.status(200).json({ message: response })
                );
              } else {
                return res.status(404).send({ message: 'Please try again' });
              }
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
    try {
      const response = await db.User.update(
        { status: 'inactive' },
        {
          where: {
            email: req.params.email,
          },
        }
      );
      return response
        ? res.status(200).json({
          message: 'User deactivated successfully',
        })
        : res.status(404).json({
          error: 'Sorry, deactivation failed..Try again',
        });
    } catch (error) {
      logger.customLogger.log('error', error);
      // console.log(err)
      return res.status(400).send({ message: 'Sorry, Action failed' });
    }
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
            notification.notify(
              'account activation',
              { email: user.email },
              response => res.status(200).json({ message: response })
            );
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
              notification.notify(
                'account activation link resubmission',
                parameters,
                () => res
                  .status(200)
                  .json({ message: `Activation Link sent to ${user.email}` })
              );
            } else {
              return res
                .status(200)
                .json({
                  message:
                    ' Activation Link Resubmission Error, try again later',
                });
            }
          } else {
            return res
              .status(200)
              .json({
                message:
                  'The account linked to provided email is no longer pending!!!',
              });
          }
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
    try {
      const response = await db.User.update(
        { role: req.body.role },
        { where: { id: req.params.userId } }
      );
      return response
        ? res.status(200).json({ message: "User's role changed successfully" })
        : res
          .status(404)
          .json({ error: 'Sorry, role change failed..Try again' });
    } catch (error) {
      logger.customLogger.log('error', error);
      // console.log(err)
      return res
        .status(400)
        .send({ message: 'Sorry, role change failed..Try again' });
    }
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
