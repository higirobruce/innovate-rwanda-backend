import { Router } from "express";
import GenericController from "../../controllers/GenericController";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const generic = Router();

/* 
 * For getting statistics for admins on the system
 * Returns Companies counts per status, 
 *         Total number of companies,
 *         Users counts per status
 *         Total number of users
 */
generic.get(
    "/counters",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    GenericController.getCounts
);

/* 
 * For getting statistics for registered Company
 * Returns Jobs counts per status, 
 *         Total number of jobs,
 *         Blogs counts per status
 *         Total number of blogs
 *         Events counts per status
 *         Total number of events
 */
generic.get(
    "/countersCo",
    auth.verifyToken,
    checkPermissions("normal"),
    GenericController.getCountsCo
);

export default generic;
