const logger = require('../helpers/LoggerMod.js');

const checkPermissions = (actions) => {
  return async (req, res, next) => {
    try {
      if (actions.includes(req.user.role) || req.user.role === "super-admin") {
        next();
      } else {
        return res
          .status(403)
          .send({ error: "You are not allowed to perform this action" });
      }
    } catch (error) {
      logger.customLogger.log('error', error)
      next(error);
    }
  };
};

export default checkPermissions;
