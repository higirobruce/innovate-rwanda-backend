import db from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const logger = require('../helpers/LoggerMod.js');

dotenv.config();

const getToken = (req, res) => {
  const token = jwt.sign({ user: res.locals.user }, process.env.SECRETKEY, {
    expiresIn: '1d',
  });
  if (token) {
    return res.status(200).send({
      message: 'You are logged in successfully',
      user: res.locals.user,
      token: token,
      companyInfo: res.locals.companyInfo,
    });
  } else {
    return res.status(403).send({
      message: 'Invalid email, password or company information',
      user: res.locals.user,
      token: '',
      companyInfo: res.locals.companyInfo,
    });
  }
};

const verifyToken = (req, res, next) => {
  var token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized access' });
  }
  try {
    token = token.replace(/^Bearer\s+/, '');
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        return err.name == 'TokenExpiredError'
          ? res.status(401).send({
              message: 'TokenExpiredError',
            })
          : res.status(403).send({
              message: 'Unauthorized access',
            });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    logger.customLogger.log('error', error)
    return res.status(401).send({
      message: 'Invalid email, password or company information',
    });
  }
};

export default {
  getToken,
  verifyToken,
};
