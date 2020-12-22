import { Router } from "express";

import CompanyController from "../../controllers/CompanyController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const company = Router();

company.get(
  "/directory/admin",
  auth.verifyToken,
  checkPermissions("admin-company"),
  CompanyController.getCompaniesList
);
company.get(
  "/directory/public",
  CompanyController.getApprovedCompaniesList
);

company.get(
  "/directory/public/:type",
  CompanyController.getApprovedCompaniesByType
);

company.put(
  "/company/approve-decline",
  auth.verifyToken,
  checkPermissions("admin-company"),
  CompanyController.approveOrDeclineCompany
);

company.get(
  "/company/my-company",
  auth.verifyToken,
  checkPermissions(["normal"]),
  CompanyController.getCompanyMyInfo
);

company.get(
  "/company/:companyId",
  CompanyController.getCompanyInfo
);

company.get(
  "/company/public/:slug",
  CompanyController.getCompanyInfoPublic
);

company.patch(
  "/company/edit/:companyId",
  auth.verifyToken,
  checkPermissions(["normal", "admin-company"]),
  CompanyController.editCompanyInfo
);

company.delete(
  "/company/delete",
  auth.verifyToken,
  checkPermissions("admin-company"),
  CompanyController.deleteCompany
);

/* 
 * Filters
 * Require (request body) filterBy ---   location       | activities            | year-founded
 *                        filterValue--  the district   | array of activity ids | a year-eg.2005 
 * Returns Directory filtered
 */
company.get(
  "/directory/filter",
  CompanyController.getDirectoryFiltered
);

/* 
 * Sort
 * Require (request body) sortBy ---    year-founded or name (company names)
 *                        sortValue--   desc or asc
 * Returns Directory sorted
 */
company.get(
  "/directory/sort",
  CompanyController.getDirectorySorted
);

// Search in names, company types, website,description, district based in, customer base and, Office Address
company.get(
  "/directory/search",
  CompanyController.searchDirectory
);

export default company;
