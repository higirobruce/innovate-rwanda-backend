import { Router } from "express";

import MessageController from "../../controllers/MessageController";
import NotificationController from "../../controllers/NotificationController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const message = Router();

message.post(
  "/message/post",
  MessageController.messagePost
);

message.get(
  "/message/company/:companyId",
  auth.verifyToken,
  checkPermissions("normal"),
  MessageController.getMessagesListPerCompany
);



message.get(
  "/message/info/:messageId",
  auth.verifyToken,
  checkPermissions("normal"),
  MessageController.getMessageInfo
);

// Search in Sender email and Message
message.get(
  "/message/search",
  auth.verifyToken,
  checkPermissions("normal"),
  MessageController.searchForMessages
);

message.put(
  "/message/read",
  auth.verifyToken,
  checkPermissions(["normal","admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
  MessageController.setRead
);

/*
 * Notifications
 */
message.get(
  "/notification/company",
  auth.verifyToken,
  checkPermissions("normal"),
  NotificationController.getNotificationsForCompany
);

message.put(
  "/notification/read",
  auth.verifyToken,
  checkPermissions(["normal","admin-company", "admin-job", "admin-event", "admin-blog", "admin-user"]),
  NotificationController.setRead
);

export default message;
