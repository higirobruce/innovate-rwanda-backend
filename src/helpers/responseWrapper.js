import dayjs from 'dayjs';
import { SERVER_ERROR } from '../constants/statusCodes';

const responseWrapper = (data) => {
  const status = data.status || SERVER_ERROR;

  return data.res.status(status).json({
    status,
    ...data,
    res: undefined,
    timestamp: dayjs().format(),
  });
};

export default responseWrapper;
