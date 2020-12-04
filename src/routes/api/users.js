import { Router } from 'express';

import  userController from '../../controllers/UserController';

import  auth from '../../middlewares/authorization_authentication.js';

const users = Router();

// register
users.post('/register', userController.register);

users.post('/login', userController.login, auth.getToken);

users.get('/users', userController.getUsersList);

// Normal change of password
users.post('/change-password', userController.changePassword);

// Sends email on provided email for confirmation
users.put('/forgot-password', userController.forgotPassword);

// Get token that was sent on email
users.put('/reset-password', userController.resetPassword);

export default users;
