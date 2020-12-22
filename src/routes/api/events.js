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

/* 
 * Filters
 * Require (request body) filterBy ---   company       | topic                 | year
 *                        filterValue--  id of company | array of activity ids | a year-eg.2020 
 * Returns List of jobs filtered
 */
events.get(
  "/events/public/filter",
  EventsController.getEventsFiltered
);

/* 
 * Sort
 * Require (request body) sortBy ---    date or  title
 *                        sortValue--   desc or asc
 * Returns List of jobs sorted
 */
events.get(
  "/events/public/sort",
  EventsController.getEventsSorted
);

// Search in title, description and category
events.get(
  "/events/public/search",
  EventsController.searchForEvents
);

export default events;
