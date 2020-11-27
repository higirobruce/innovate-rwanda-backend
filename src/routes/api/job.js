import { Router } from "express";

import JobController from "../../controllers/JobController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const job = Router();

// Blogs
job.post(
  "/jobs",
  checkPermissions("normal"),
  auth.verifyToken,
  JobController.jobPost
);
job.put("/jobs/approve",checkPermissions("admin-job"), auth.verifyToken, JobController.approveJobPost);
job.get("/jobs/:status", auth.verifyToken, JobController.getJobsList);

export default job;
