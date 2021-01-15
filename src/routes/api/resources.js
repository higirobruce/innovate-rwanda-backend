import { Router } from "express";
import ResourceController from "../../controllers/ResourceController";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const resources = Router();

resources.get(
    "/resources",
    ResourceController.getResources);

resources.post(
    "/resources/add-resource",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    ResourceController.addResource
);

resources.patch(
    "/resources/edit-resource",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    ResourceController.editResource
);

resources.delete(
    "/resources/remove-resource",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    ResourceController.removeResource
);

export default resources;