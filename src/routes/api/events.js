import { Router } from 'express';

import EventsController from '../../controllers/EventsController';

import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';

const events = Router();

events.post(
  '/events',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(EventsController.eventPost)
);

events.put(
  '/events/approve-decline',
  auth.verifyToken,
  checkPermissions(['admin-event']),
  asyncHandler(EventsController.approveOrDeclineEventPost)
);

events.put(
  '/events/manage',
  auth.verifyToken,
  checkPermissions('admin-event'),
  asyncHandler(EventsController.manageEventPost)
);

events.get(
  '/events/public',
  asyncHandler(EventsController.getApprovedEventsList)
);

events.get(
  '/events/company/:companyId',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(EventsController.getEventsListPerCompany)
);

events.get(
  '/events/:status',
  auth.verifyToken,
  checkPermissions('admin-event'),
  asyncHandler(EventsController.getEventsList)
);

events.get(
  '/events/info/:eventId',
  asyncHandler(EventsController.getEventInfo)
);

events.patch(
  '/events/edit',
  auth.verifyToken,
  asyncHandler(EventsController.editEventInfo)
);

events.delete(
  '/events/delete',
  auth.verifyToken,
  checkPermissions(['normal', 'admin-event']),
  asyncHandler(EventsController.deleteEvent)
);

/*
 * FilterBy ---   company       | topic                 | year            | company-type
 * FilterValue--  id of company | activity id           | a year-eg.2020  |
 */
events.get(
  '/events/public/filter',
  asyncHandler(EventsController.getEventsFiltered)
);

/*
 * SortBy ---    date or  title
 * SortValue--   desc or asc
 */
events.get(
  '/events/public/sort',
  asyncHandler(EventsController.getEventsSorted)
);

// Search in title, description and category
events.get(
  '/events/public/search',
  asyncHandler(EventsController.searchForEvents)
);

export default events;
