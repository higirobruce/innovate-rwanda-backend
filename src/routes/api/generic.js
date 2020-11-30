import { Router } from "express";
import GenericController from "../../controllers/GenericController";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const generic = Router();

generic.get("/counters", auth.verifyToken,
checkPermissions(["normal","admin-company","admin-job","admin-event","admin-blog"]),
GenericController.getCounts);

export default generic;
