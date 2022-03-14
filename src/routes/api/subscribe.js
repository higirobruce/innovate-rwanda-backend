import { Router } from 'express';

import SubscribeController from '../../controllers/SubscribeController';

import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';

const subscribe = Router();

subscribe.post(
  '/subscribe',
  asyncHandler(SubscribeController.subscribeToNotification)
);

subscribe.delete(
  '/unsubscribe/:email',
  asyncHandler(SubscribeController.unsubscribeFromNotification)
);

subscribe.get(
  '/subscriptions',
  auth.verifyToken,
  checkPermissions([
    'admin-company',
    'admin-job',
    'admin-event',
    'admin-blog',
    'admin-user',
  ]),
  asyncHandler(SubscribeController.getSubscriptions)
);

export default subscribe;
