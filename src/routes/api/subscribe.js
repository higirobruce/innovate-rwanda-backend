import { Router } from 'express';

import SubscribeController from '../../controllers/SubscribeController';

import auth from '../../middlewares/authorization_authentication.js';
import checkPermissions from '../../middlewares/checkPermissions';

const subscribe = Router();

subscribe.post(
    "/subscribe",
    SubscribeController.subscribeToNotification
);

subscribe.delete(
    "/unsubscribe/:email",
    SubscribeController.unsubscribeFromNotification
);

subscribe.get(
    "/subscriptions",
    auth.verifyToken,
    checkPermissions([
      "admin-company",
      "admin-job",
      "admin-event",
      "admin-blog",
      "admin-user",
    ]),
    SubscribeController.getSubscriptions
);

export default subscribe;
