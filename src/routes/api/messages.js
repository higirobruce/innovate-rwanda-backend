import { Router } from "express";

import MessageController from "../../controllers/MessageController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const message = Router();

message.post("/message/post", MessageController.messagePost);

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

export default message;
