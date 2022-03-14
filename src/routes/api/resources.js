import { Router } from 'express';
import ResourceController from '../../controllers/ResourceController';
import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';


const resources = Router();

resources.get(
  '/resources',
  asyncHandler(ResourceController.getResources)
);

resources.get(
  '/resources/:id',
  asyncHandler(ResourceController.getResource)
);

resources.post(
  '/resources/add-resource',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(ResourceController.addResource)
);

resources.patch(
  '/resources/edit-resource',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(ResourceController.editResource)
);

resources.delete(
  '/resources/remove-resource',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(ResourceController.removeResource)
);

export default resources;
