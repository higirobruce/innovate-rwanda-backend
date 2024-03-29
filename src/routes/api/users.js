import { Router } from 'express';

import userController from '../../controllers/UserController';
import asyncHandler from '../../middlewares/asyncErrorHandler';

import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

const users = Router();

users.post(
  '/register',
  asyncHandler(userController.register)
);

users.get(
  '/activate-account/:activationLink',
  asyncHandler(userController.activateAccount)
);

users.get(
  '/account-activation-link',
  auth.verifyToken,
  checkPermissions('admin-user'),
  asyncHandler(userController.resendAccountActivationLink)
);

users.post(
  '/users/create',
  auth.verifyToken,
  checkPermissions('admin-user'),
  asyncHandler(userController.createUser)
);

users.post(
  '/login',
  userController.login,
  asyncHandler(auth.getToken)
);

users.get(
  '/users',
  auth.verifyToken,
  checkPermissions('admin-user'),
  asyncHandler(userController.getUsersList)
);

users.get(
  '/profile',
  auth.verifyToken,
  asyncHandler(userController.getUserProfile)
);

users.put(
  '/profile/edit',
  auth.verifyToken,
  asyncHandler(userController.editProfile)
);

users.put(
  '/users/change-role/:userId',
  auth.verifyToken,
  checkPermissions('admin-user'),
  asyncHandler(userController.changeRole)
);

// Normal change of password
users.post(
  '/change-password',
  auth.verifyToken,
  asyncHandler(userController.changePassword)
);

// Sends email on provided email for confirmation
users.put(
  '/forgot-password',
  asyncHandler(userController.forgotPassword)
);

// Get token that was sent on email
users.put(
  '/reset-password/:resetLink',
  asyncHandler(userController.resetPassword)
);

users.delete(
  '/users/deactivate/:email',
  auth.verifyToken,
  checkPermissions('admin-user'),
  asyncHandler(userController.deactivateUser)
);

users.put(
  '/users/activate/:email',
  auth.verifyToken,
  checkPermissions('admin-user'),
  asyncHandler(userController.activateUser)
);

// Search in Names, Emails, Job Titles and user role
users.get(
  '/users/search',
  auth.verifyToken,
  checkPermissions('admin-user'),
  asyncHandler(userController.searchForUsers)
);

export default users;
