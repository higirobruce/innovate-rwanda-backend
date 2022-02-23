import { errors, isCelebrateError } from 'celebrate';
import { BAD_REQUEST } from '../constants/statusCodes';
import responseWrapper from '../helpers/responseWrapper';

const joiErrors = () => (err, req, res, next) => {
  if (!isCelebrateError(err)) return next(err);

  const message = 'Bad Request';

  return responseWrapper({
    res,
    status: BAD_REQUEST,
    error: errors.length && errors[0] ? errors[0].message || message : message,
  });
};

export default joiErrors;
