import { Router } from "express";
import EventsTypes from "../../controllers/EventsTypes";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const types = Router();

types.get(
    "/events-types",
    EventsTypes.getEventsTypes);

types.post(
    "/events-types/add-type",
    // auth.verifyToken,
    // checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    EventsTypes.addType
);

types.patch(
    "/events-types/edit-type",
    // auth.verifyToken,
    // checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    EventsTypes.editType
);

types.delete(
    "/events-types/remove-type",
    // auth.verifyToken,
    // checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    EventsTypes.removeType
);

export default types;