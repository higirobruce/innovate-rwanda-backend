import { Router } from "express";

import EventsController from "../../controllers/EventsController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const events = Router();

events.post(
  "/events",
  auth.verifyToken,
  checkPermissions("normal"),
  EventsController.eventPost
);

events.put(
  "/events/approve-decline",
  auth.verifyToken,
  EventsController.approveOrDeclineEventPost
);

events.get(
  "/events/public",
  EventsController.getApprovedEventsList
);

events.get(
  "/events/company/:companyId",
  auth.verifyToken,
  checkPermissions("normal"),
  EventsController.getEventsListPerCompany
);

events.get(
  "/events/:status",
  auth.verifyToken,
  checkPermissions("admin-event"),
  EventsController.getEventsList
);

events.get(
  "/events/info/:eventId",
  EventsController.getEventInfo
);

events.patch(
  "/events/edit",
  auth.verifyToken,
  EventsController.editEventInfo
);

events.delete(
  "/events/delete",
  auth.verifyToken,
  checkPermissions(["normal", "admin-event"]),
  EventsController.deleteEvent
);

export default events;
