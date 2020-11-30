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

job.get("/jobs/public", JobController.getApprovedJobsList);

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

job.get("/jobs/info/:jobId", JobController.getJobInfo);

job.patch("/jobs/edit", auth.verifyToken, JobController.editJobInfo);

job.delete(
  "/jobs/delete",
  auth.verifyToken,
  checkPermissions(["normal", "admin-job"]),
  JobController.deleteJob
);

export default job;
