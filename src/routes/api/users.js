import { Router } from "express";

import userController from "../../controllers/UserController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const users = Router();

users.post(
  "/register",
  userController.register
);

users.get(
  "/activate-account/:activationLink",
  userController.activateAccount
);

users.post(
  "/users/create",
  auth.verifyToken,
  checkPermissions("admin-user"),
  userController.createUser
);

users.post(
  "/login",
  userController.login,
  auth.getToken
);

users.get(
  "/users",
  auth.verifyToken,
  checkPermissions("admin-user"),
  userController.getUsersList
);

users.get(
  "/profile",
  auth.verifyToken,
  userController.getUserProfile
);

users.put(
  "/users/change-role/:userId",
  auth.verifyToken,
  checkPermissions("admin-user"),
  userController.changeRole
);

// Normal change of password
users.post(
  "/change-password",
  auth.verifyToken,
  userController.changePassword
);

// Sends email on provided email for confirmation
users.put(
  "/forgot-password",
  userController.forgotPassword
);

// Get token that was sent on email
users.put(
  "/reset-password/:resetLink",
  userController.resetPassword
);

users.delete(
  "/users/deactivate/:email",
  auth.verifyToken,
  checkPermissions("admin-user"),
  userController.deactivateUser
);

users.put(
  "/users/activate/:email",
  auth.verifyToken,
  checkPermissions("admin-user"),
  userController.activateUser
);

// Search in Names, Emails, Job Titles and user role
users.get(
  "/users/search",
  auth.verifyToken,
  checkPermissions("admin-user"),
  userController.searchForUsers
);

export default users;