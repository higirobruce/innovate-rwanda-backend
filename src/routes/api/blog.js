import { Router } from "express";

import BlogController from "../../controllers/BlogController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const blog = Router();

blog.post(
  "/blog/post",
  auth.verifyToken,
  checkPermissions("normal"),
  BlogController.blogPost
);

blog.put(
  "/blog/approve-decline",
  auth.verifyToken,
  checkPermissions(["admin-blog"]),
  BlogController.approveOrDeclineBlogPost
);

blog.get(
  "/blog/public",
  BlogController.getApprovedBlogsList
);

blog.get(
  "/blog/company/:companyId",
  auth.verifyToken,
  checkPermissions("normal"),
  BlogController.getBlogsListPerCompany
);

blog.get(
  "/blog/:status",
  auth.verifyToken,
  checkPermissions(["admin-blog"]),
  BlogController.getBlogsList
);

blog.get(
  "/blog/info/:blogId",
  BlogController.getBlogInfo
);

blog.patch(
  "/blog/edit/:blogId",
  auth.verifyToken,
  BlogController.editBlogInfo
);

blog.delete(
  "/blog/delete/:blogId",
  auth.verifyToken,
  checkPermissions(["normal", "admin-blog"]),
  BlogController.deleteBlog
);

blog.get(
  "/blogs/public/filter",
  BlogController.getBlogsFiltered
);

blog.get(
  "/blogs/public/sort",
  BlogController.getBlogsSorted
);

export default blog;
