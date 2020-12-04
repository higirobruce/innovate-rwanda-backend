import { Router } from 'express';

import SubscribeController from '../../controllers/SubscribeController';

import auth from '../../middlewares/authorization_authentication.js';

const subscribe = Router();

subscribe.post('/subscribe', SubscribeController.subscribeToNotification);

subscribe.put('/unsubscribe', SubscribeController.unsubscribeFromNotification);

subscribe.get('/subscriptionsList/:status', auth.verifyToken, SubscribeController.getSubscriptions);

export default subscribe;
