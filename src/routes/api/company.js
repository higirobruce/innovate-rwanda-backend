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
company.get("/directory/public", CompanyController.getApprovedCompaniesList);
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
company.get("/company/:companyId", CompanyController.getCompanyInfo);

company.get("/company/public/:slug", CompanyController.getCompanyInfoPublic);

company.patch("/company/edit/:companyId", auth.verifyToken, checkPermissions(["normal", "admin-company"]),
    CompanyController.editCompanyInfo);

company.delete("/company/delete", auth.verifyToken, checkPermissions("admin-company"),
    CompanyController.deleteCompany);

export default company;
