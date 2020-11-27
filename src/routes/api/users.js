import { Router } from 'express';

import  userController from '../../controllers/UserController';

import  auth from '../../middlewares/authorization_authentication.js';

const users = Router();

// register
users.post('/register', userController.register);
users.post('/login', userController.login, auth.getToken);
users.get('/users', userController.getUsersList);

export default users;
