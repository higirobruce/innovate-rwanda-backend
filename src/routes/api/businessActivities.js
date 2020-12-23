import { Router } from "express";
import BusinessActivities from "../../controllers/BusinessActivities";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const activities = Router();

activities.get(
    "/business-activities",
    BusinessActivities.getBusinessActivities);

activities.post(
    "/business-activities/add-activity",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    BusinessActivities.addActivity
);

activities.patch(
    "/business-activities/edit-activity",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    BusinessActivities.editActivity
);

activities.delete(
    "/business-activities/remove-activity",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    BusinessActivities.removeActivity
);

export default activities;
