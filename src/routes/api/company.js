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

company.put(
  "/company/manage",
  auth.verifyToken,
  checkPermissions("admin-company"),
  CompanyController.manageCompany
);

company.get(
  "/company/my-company",
  auth.verifyToken,
  checkPermissions(["normal"]),
  CompanyController.getCompanyMyInfo
);

company.get(
  "/company/:companyId",
  auth.verifyToken,
  checkPermissions(["normal", "admin-company"]),
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
  "/company/delete/:companyId",
  auth.verifyToken,
  checkPermissions("admin-company"),
  CompanyController.deleteCompany
);

company.delete(
  "/company/delete-company",
  auth.verifyToken,
  checkPermissions("normal"),
  CompanyController.deleteOwnCo
);

company.get(
  "/recover-company/emaillink/:recoveryToken",
  CompanyController.recoverCompany
);

/* 
 * filterBy ---   location       | activities            | year-founded
 * filterValue--  the district   | activity id           | a year-eg.2005 
 */
company.get(
  "/directory/filter",
  CompanyController.getDirectoryFiltered
);

/* 
 * sortBy ---    year-founded or name (company names)
 * sortValue--   desc or asc
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

/* 
 * filterBy ---   location       | activities            | year-founded
 * filterValue--  the district   | activity id           | a year-eg.2005 
 * type can be enabler or Tech Company or other depending on types set for companies
 */
company.get(
  "/directory/filter/:type",
  CompanyController.getDirectoryFilteredByType
);

/* 
 * sortBy ---    year-founded or name (company names)
 * sortValue--   desc or asc
 * type can be enabler or Tech Company or other depending on types set for companies
 */
company.get(
  "/directory/sort/:type",
  CompanyController.getDirectorySortedByType
);

// Search in names, company types, website,description, district based in, customer base and, Office Address
// type can be enabler or Tech Company or other depending on types set for companies
company.get(
  "/directory/search/:type",
  CompanyController.searchDirectoryByType
);

export default company;
