import { Router } from 'express';
import ResourcesTypes from '../../controllers/ResourcesTypes';
import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';

const types = Router();

types.get(
  '/resources-types',
  asyncHandler(ResourcesTypes.getResourcesTypes)
);

types.post(
  '/resources-types/add-type',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(ResourcesTypes.addType)
);

types.patch(
  '/resources-types/edit-type',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(ResourcesTypes.editType)
);

types.delete(
  '/resources-types/remove-type',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(ResourcesTypes.removeType)
);

export default types;
