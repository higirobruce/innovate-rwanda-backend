import { Router } from 'express';

import MessageController from '../../controllers/MessageController';
import NotificationController from '../../controllers/NotificationController';

import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';
import asyncHandler from '../../middlewares/asyncErrorHandler';

const message = Router();

message.get('/messages', auth.verifyToken, asyncHandler(MessageController.getAllMessages));
message.post('/messages', auth.verifyToken, asyncHandler(MessageController.sendMessage));
message.get('/messages/history', auth.verifyToken, asyncHandler(MessageController.getMessageHistory));

message.post(
  '/message/post',
  asyncHandler(MessageController.messagePost)
);

message.get(
  '/message/company/:companyId',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(MessageController.getMessagesListPerCompany)
);


message.get(
  '/message/info/:messageId',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(MessageController.getMessageInfo)
);

// Search in Sender email and Message
message.get(
  '/message/search',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(MessageController.searchForMessages)
);

message.put(
  '/message/read',
  auth.verifyToken,
  checkPermissions(['normal', 'admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(MessageController.setRead)
);

/*
 * Notifications
 */
message.get(
  '/notification/company',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(NotificationController.getNotificationsForCompany)
);

message.put(
  '/notification/read',
  auth.verifyToken,
  checkPermissions(['normal', 'admin-company', 'admin-job', 'admin-event', 'admin-blog', 'admin-user']),
  asyncHandler(NotificationController.setRead)
);

export default message;
