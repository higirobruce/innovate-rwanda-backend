import db from '../models';

import responseWrapper from '../helpers/responseWrapper';
import { OK } from '../constants/statusCodes';

import asyncHandler from '../middlewares/asyncErrorHandler';

export const getLogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;

  const offset = limit * (page - 1);

  const logs = await db.Activity.findAndCountAll({
    offset,
    limit,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: db.User,
        as: 'user',
        required: false,
      }
    ]
  });

  const total = logs.count;

  const pages = Math.ceil(total / limit);

  const meta = {
    total,
    page,
    pages
  };

  return responseWrapper({
    res,
    status: OK,
    data: logs.rows,
    meta,
  });
});

export default {};
