import { Router } from "express";

import userController from "../../controllers/UserController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const users = Router();

// register
users.post("/register", userController.register);

users.post("/login", userController.login, auth.getToken);

users.get(
  "/users",
  auth.verifyToken,
  checkPermissions("admin-user"),
  userController.getUsersList
);

// Normal change of password
users.post("/change-password", auth.verifyToken, userController.changePassword);

// Sends email on provided email for confirmation
users.put("/forgot-password", userController.forgotPassword);

// Get token that was sent on email
users.put("/reset-password", userController.resetPassword);

users.delete(
  "/users/deactivate",
  checkPermissions("admin-user"),
  auth.verifyToken,
  userController.deactivateUser
);

export default users;
