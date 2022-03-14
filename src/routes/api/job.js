import { Router } from 'express';
import JobController from '../../controllers/JobController';
import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

import asyncHandler from '../../middlewares/asyncErrorHandler';


const job = Router();

job.post(
  '/jobs/post',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(JobController.jobPost)
);

job.put(
  '/jobs/approve-decline',
  auth.verifyToken,
  checkPermissions('admin-job'),
  asyncHandler(JobController.approveOrDeclineJobPost)
);

job.put(
  '/jobs/manage',
  auth.verifyToken,
  checkPermissions('admin-job'),
  asyncHandler(JobController.manageJobPost)
);

job.get(
  '/jobs/public',
  asyncHandler(JobController.getApprovedJobsList)
);

job.get(
  '/jobs/company/:companyId',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(JobController.getJobsListPerCompany)
);

job.get(
  '/jobs/:status',
  auth.verifyToken,
  checkPermissions('admin-job'),
  asyncHandler(JobController.getJobsList)
);

job.get(
  '/jobs/info/:jobId',
  asyncHandler(JobController.getJobInfo)
);

job.patch(
  '/jobs/edit',
  auth.verifyToken,
  asyncHandler(JobController.editJobInfo)
);

job.delete(
  '/jobs/delete',
  auth.verifyToken,
  checkPermissions(['normal', 'admin-job']),
  asyncHandler(JobController.deleteJob)
);

/*
 * FilterBy ---   company       | topic                 | year            | company-type
 * FilterValue--  id of company | activity id           | a year-eg.2020  |
 */
job.get(
  '/jobs/public/filter',
  asyncHandler(JobController.getJobsFiltered)
);

/*
 * SortBy ---    date or  title
 * SortValue--   desc or asc
 */
job.get(
  '/jobs/public/sort',
  asyncHandler(JobController.getJobsSorted)
);

// Search in Title, Description and Category
job.get(
  '/jobs/public/search',
  asyncHandler(JobController.searchForJobs)
);

export default job;
