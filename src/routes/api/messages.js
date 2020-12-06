import { Router } from "express";

import MessageController from "../../controllers/MessageController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const message = Router();

message.post("/message/post", MessageController.messagePost);

message.get("/message/company/:companyId", checkPermissions("normal"), auth.verifyToken, MessageController.getMessagesListPerCompany);

message.get("/message/info/:messageId", checkPermissions("normal"), auth.verifyToken, MessageController.getMessageInfo);

export default message;
