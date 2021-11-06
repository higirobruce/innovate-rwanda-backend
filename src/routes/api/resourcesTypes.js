import { Router } from "express";
import ResourcesTypes from "../../controllers/ResourcesTypes";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const types = Router();

types.get(
    "/resources-types",
    ResourcesTypes.getResourcesTypes);

types.post(
    "/resources-types/add-type",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    ResourcesTypes.addType
);

types.patch(
    "/resources-types/edit-type",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    ResourcesTypes.editType
);

types.delete(
    "/resources-types/remove-type",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    ResourcesTypes.removeType
);

export default types;