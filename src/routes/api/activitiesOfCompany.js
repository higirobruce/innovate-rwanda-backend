import { Router } from "express";

import GenericController from "../../controllers/GenericController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const activityOfCompany = Router();

activityOfCompany.post(
  "/activities/add-activity",
  auth.verifyToken,
  checkPermissions("normal"),
  GenericController.addCompanyActivity
);

activityOfCompany.delete(
  "/activities/remove-activity",
  auth.verifyToken,
  checkPermissions("normal"),
  GenericController.removeCompanyActivity
);

export default activityOfCompany;
