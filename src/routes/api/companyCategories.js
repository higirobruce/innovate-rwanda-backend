import { Router } from "express";
import CompanyCategories from "../../controllers/CompanyCategories";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const categories = Router();

categories.get(
    "/company-categories",
    CompanyCategories.getCompanyCategories);

categories.post(
    "/company-categories/add-category",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    CompanyCategories.addCategory
);

categories.patch(
    "/company-categories/edit-category",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    CompanyCategories.editCategory
);

categories.delete(
    "/company-categories/remove-category",
    auth.verifyToken,
    checkPermissions(["admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
    CompanyCategories.removeCategory
);

export default categories;