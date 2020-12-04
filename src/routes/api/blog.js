import { Router } from "express";

import BlogController from "../../controllers/BlogController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const blog = Router();

blog.post("/blog/post", checkPermissions("normal"), auth.verifyToken, BlogController.blogPost);

blog.put("/blog/approve-decline", checkPermissions("admin"), auth.verifyToken,
    BlogController.approveOrDeclineBlogPost);

blog.get("/blog/:status", auth.verifyToken, BlogController.getBlogsList);

blog.get("/blog/info/:blogId", BlogController.getBlogInfo);

blog.patch("/blog/edit", auth.verifyToken, BlogController.editBlogInfo);

export default blog;
