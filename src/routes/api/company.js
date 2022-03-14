import { Router } from 'express';

import CompanyController from '../../controllers/CompanyController';

import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';

const company = Router();

company.get(
  '/directory/admin',
  auth.verifyToken,
  checkPermissions('admin-company'),
  asyncHandler(CompanyController.getCompaniesList)
);
company.get(
  '/directory/public',
  asyncHandler(CompanyController.getApprovedCompaniesList)
);

// company.get(
//   "/directory/public/:type",
//   CompanyController.getApprovedCompaniesByType
// );

company.put(
  '/company/approve-decline',
  auth.verifyToken,
  checkPermissions('admin-company'),
  asyncHandler(CompanyController.approveOrDeclineCompany)
);

company.put(
  '/company/manage',
  auth.verifyToken,
  checkPermissions(['normal', 'admin-company']),
  asyncHandler(CompanyController.manageCompany)
);

company.get(
  '/company/my-company',
  auth.verifyToken,
  checkPermissions(['normal']),
  asyncHandler(CompanyController.getCompanyMyInfo)
);

company.get(
  '/company/:companyId',
  auth.verifyToken,
  checkPermissions(['normal', 'admin-company']),
  asyncHandler(CompanyController.getCompanyInfo)
);

company.get(
  '/company/public/:slug',
  asyncHandler(CompanyController.getCompanyInfoPublic)
);

company.patch(
  '/company/edit/:companyId',
  auth.verifyToken,
  checkPermissions(['normal', 'admin-company']),
  asyncHandler(CompanyController.editCompanyInfo)
);

company.delete(
  '/company/delete/:companyId',
  auth.verifyToken,
  checkPermissions('admin-company'),
  asyncHandler(CompanyController.deleteCompany)
);

company.delete(
  '/company/delete-company',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(CompanyController.deleteOwnCo)
);

company.get(
  '/recover-company/emaillink/:recoveryToken',
  asyncHandler(CompanyController.recoverCompany)
);

/*
 * filterBy ---   location       | activities            | year-founded
 * filterValue--  the district   | activity id           | a year-eg.2005
 */
company.get(
  '/directory/filter',
  asyncHandler(CompanyController.getDirectoryFiltered)
);

/*
 * sortBy ---    year-founded or name (company names)
 * sortValue--   desc or asc
 */
company.get(
  '/directory/sort',
  asyncHandler(CompanyController.getDirectorySorted)
);

company.get(
  '/directory/search',
  asyncHandler(CompanyController.searchDirectory)
);

/*
 * filterBy ---   location       | activities            | year-founded
 * filterValue--  the district   | activity id           | a year-eg.2005
 * type can be enabler or Tech Company or other depending on types set for companies
 */
company.get(
  '/directory/filter/:type',
  asyncHandler(CompanyController.getDirectoryFilteredByType)
);

/*
 * sortBy ---    year-founded or name (company names)
 * sortValue--   desc or asc
 * type can be enabler or Tech Company or other depending on types set for companies
 */
company.get(
  '/directory/sort/:type',
  asyncHandler(CompanyController.getDirectorySortedByType)
);

company.get(
  '/directory/search/:type',
  asyncHandler(CompanyController.searchDirectoryByType)
);

export default company;
