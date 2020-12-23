import { Router } from "express";
import CompanyTypes from "../../controllers/CompanyTypes";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const types = Router();

types.get(
    "/company-types",
    CompanyTypes.getCompanyTypes);

types.post(
    "/company-types/add-type",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    CompanyTypes.addType
);

types.patch(
    "/company-types/edit-type",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    CompanyTypes.editType
);

types.delete(
    "/company-types/remove-type",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    CompanyTypes.removeType
);

export default types;