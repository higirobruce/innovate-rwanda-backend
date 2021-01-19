import { Router } from "express";
import ResourceController from "../../controllers/ResourceController";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000, files: 1 },
});

const resources = Router();

resources.get(
    "/resources",
    ResourceController.getResources);

resources.post(
    "/resources/add-resource",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    upload.single('resourceDocument'),
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