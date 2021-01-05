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

job.put(
  "/jobs/manage",
  auth.verifyToken,
  checkPermissions("admin-job"),
  JobController.manageJobPost
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
 * FilterBy ---   company       | topic                 | year            | company-type
 * FilterValue--  id of company | activity id           | a year-eg.2020  |
 */
job.get(
  "/jobs/public/filter",
  JobController.getJobsFiltered
);

/* 
 * SortBy ---    date or  title
 * SortValue--   desc or asc
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
