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

company.put(
  "/company/approve-decline",
  auth.verifyToken,
  checkPermissions("admin-company"),
  CompanyController.approveOrDeclineCompany
);

company.get("/company/:companyId", CompanyController.getCompanyInfo);

company.patch(
  "/company/edit",
  auth.verifyToken,
  checkPermissions(["normal","admin-company"]),
  CompanyController.editCompanyInfo
);

export default company;
