import { Router } from "express";

import JobController from "../../controllers/JobController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const job = Router();

job.post(
  "/jobs/post",
  auth.verifyToken,
  checkPermissions("normal"),
  JobController.jobPost
);

job.put(
  "/jobs/approve-decline",
  auth.verifyToken,
  checkPermissions("admin-job"),
  JobController.approveOrDeclineJobPost
);

job.get(
  "/jobs/public",
  JobController.getApprovedJobsList
);

job.get(
  "/jobs/company/:companyId",
  auth.verifyToken,
  checkPermissions("normal"),
  JobController.getJobsListPerCompany
);

job.get(
  "/jobs/:status",
  auth.verifyToken,
  checkPermissions("admin-job"),
  JobController.getJobsList
);

job.get(
  "/jobs/info/:jobId",
  JobController.getJobInfo
);

job.patch(
  "/jobs/edit",
  auth.verifyToken,
  JobController.editJobInfo
);

job.delete(
  "/jobs/delete",
  auth.verifyToken,
  checkPermissions(["normal", "admin-job"]),
  JobController.deleteJob
);

/* 
 * Filters
 * Require (request body) filterBy ---   company       | topic                 | year
 *                        filterValue--  id of company | array of activity ids | a year-eg.2020 
 * Returns List of jobs filtered
 */
job.get(
  "/jobs/public/filter",
  JobController.getJobsFiltered
);

/* 
 * Sort
 * Require (request body) sortBy ---    date or  title
 *                        sortValue--   desc or asc
 * Returns List of jobs sorted
 */
job.get(
  "/jobs/public/sort",
  JobController.getJobsSorted
);

// Search in Title, Description and Category
job.get(
  "/jobs/public/search",
  JobController.searchForJobs
);

export default job;
