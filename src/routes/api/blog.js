import { Router } from "express";

import BlogController from "../../controllers/BlogController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const blog = Router();

blog.post(
  "/blog",
  checkPermissions("normal"),
  auth.verifyToken,
  BlogController.blogPost
);
blog.put(
  "/blog/:id",
  checkPermissions("admin"),
  auth.verifyToken,
  BlogController.approveBlogPost
);
blog.get("/blog/:status", auth.verifyToken, BlogController.getBlogsList);

export default blog;
