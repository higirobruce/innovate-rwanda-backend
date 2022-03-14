import { Router } from 'express';
import CompanyTypes from '../../controllers/CompanyTypes';
import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';

const types = Router();

types.get(
  '/company-types',
  asyncHandler(CompanyTypes.getCompanyTypes)
);

types.post(
  '/company-types/add-type',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(CompanyTypes.addType)
);

types.patch(
  '/company-types/edit-type',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(CompanyTypes.editType)
);

types.delete(
  '/company-types/remove-type',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(CompanyTypes.removeType)
);

export default types;
