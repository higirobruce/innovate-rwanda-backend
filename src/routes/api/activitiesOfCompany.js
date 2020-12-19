import { Router } from "express";

import CompanyController from "../../controllers/CompanyController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const activityOfCompany = Router();

activityOfCompany.post(
  "/activities/add-activity",
  auth.verifyToken,
  checkPermissions("normal"),
  CompanyController.addActivity
);

activityOfCompany.delete(
  "/activities/remove-activity",
  auth.verifyToken,
  checkPermissions("normal"),
  CompanyController.removeActivity
);

export default activityOfCompany;
