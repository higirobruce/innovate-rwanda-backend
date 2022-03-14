import { Router } from 'express';
import BusinessActivities from '../../controllers/BusinessActivities';
import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';

const activities = Router();

activities.get(
  '/business-activities',
  asyncHandler(BusinessActivities.getBusinessActivities)
);

activities.post(
  '/business-activities/add-activity',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(BusinessActivities.addActivity)
);

activities.patch(
  '/business-activities/edit-activity',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(BusinessActivities.editActivity)
);

activities.delete(
  '/business-activities/remove-activity',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(BusinessActivities.removeActivity)
);

export default activities;
