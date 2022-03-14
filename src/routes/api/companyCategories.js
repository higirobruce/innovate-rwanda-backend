import { Router } from 'express';
import CompanyCategories from '../../controllers/CompanyCategories';
import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';

const categories = Router();

categories.get(
  '/company-categories',
  asyncHandler(CompanyCategories.getCompanyCategories)
);

categories.post(
  '/company-categories/add-category',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(CompanyCategories.addCategory)
);

categories.patch(
  '/company-categories/edit-category',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(CompanyCategories.editCategory)
);

categories.delete(
  '/company-categories/remove-category',
  auth.verifyToken,
  checkPermissions(['admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(CompanyCategories.removeCategory)
);

export default categories;
