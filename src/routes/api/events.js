import { Router } from "express";

import EventsController from "../../controllers/EventsController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const events = Router();

// Events
events.post('/events', 
checkPermissions("normal"), auth.verifyToken, EventsController.eventPost);
events.put('/events/approve', auth.verifyToken, EventsController.approveEventPost);
events.get('/events/:status', auth.verifyToken, EventsController.getEventsList);

export default events;
