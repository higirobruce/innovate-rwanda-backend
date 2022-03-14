import { Router } from 'express';
import EventsTypes from '../../controllers/EventsTypes';
import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';

const types = Router();

types.get(
  '/events-types',
  asyncHandler(EventsTypes.getEventsTypes)
);

types.post(
  '/events-types/add-type',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(EventsTypes.addType)
);

types.patch(
  '/events-types/edit-type',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(EventsTypes.editType)
);

types.delete(
  '/events-types/remove-type',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(EventsTypes.removeType)
);

export default types;
