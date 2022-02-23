import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { customLogger } from '../helpers/LoggerMod';
import responseWrapper from '../helpers/responseWrapper';
import { CREATED, FORBIDDEN, UNAUTHORIZED } from '../constants/statusCodes';

const getToken = (req, res) => {
  const token = jwt.sign({ user: res.locals.user }, process.env.SECRETKEY, {
    expiresIn: '1d',
  });
  return responseWrapper({
    res,
    status: CREATED,
    message: 'You are logged in successfully',
    user: res.locals.user,
    token,
    companyInfo: res.locals.companyInfo,
  });
};

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    return responseWrapper({
      res,
      status: UNAUTHORIZED,
      error: 'Unauthorized access'
    });
  }
  try {
    token = token.replace(/^Bearer\s+/, '');
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        return err.name === 'TokenExpiredError'
          ? responseWrapper({
            res,
            status: UNAUTHORIZED,
            message: 'TokenExpiredError',
          })
          : responseWrapper({
            res,
            status: FORBIDDEN,
            message: 'Unauthorized access',
          });
      }
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    customLogger.log('error', error);
    return responseWrapper({
      res,
      status: UNAUTHORIZED,
      message: 'Invalid email, password or company information',
    });
  }
};

export default {
  getToken,
  verifyToken,
};
