import { Router } from "express";

import GenericController from "../../controllers/GenericController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const audinceForPost = Router();

audinceForPost.post(
  "/post/add-activity",
  auth.verifyToken,
  checkPermissions("normal"),
  GenericController.addPostActivity
);

audinceForPost.delete(
  "/post/remove-activity",
  auth.verifyToken,
  checkPermissions("normal"),
  GenericController.removePostActivity
);

export default audinceForPost;
