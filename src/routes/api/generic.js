import { Router } from "express";
import GenericController from "../../controllers/GenericController";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const generic = Router();

/* 
 * For getting statistics for admins on the system
 * Returns Number of approved companies,
 *         Total number of users
 *         Number of pending comapnies' requests,
 */
generic.get(
    "/counters",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    GenericController.getCounts
);

/* 
 * For getting statistics for registered Company
 * Returns Total number of jobs,
 *         Total number of blogs
 *         Total number of events
 */
generic.get(
    "/countersCo",
    auth.verifyToken,
    checkPermissions("normal"),
    GenericController.getCountsCo
);

generic.get(
    "/countsNew",
    auth.verifyToken,
    checkPermissions(["normal","admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    GenericController.getCountsNew
);

export default generic;
