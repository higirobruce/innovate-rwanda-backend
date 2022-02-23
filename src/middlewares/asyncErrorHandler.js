import { SERVER_ERROR } from '../constants/statusCodes';
import { customLogger } from '../helpers/LoggerMod';
import responseWrapper from '../helpers/responseWrapper';

const asyncHandler = cb => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (error) {
    customLogger.error(error);
    customLogger.log(error);
    const message = error.message || error.data.errorMessage;

    const status = error.status || SERVER_ERROR;

    return responseWrapper({
      res,
      status,
      error: message
    });
  }
};

export default asyncHandler;
