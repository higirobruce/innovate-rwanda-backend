import { Router } from "express";

import JobController from "../../controllers/JobController";

import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

const job = Router();

job.post("/jobs/post", checkPermissions("normal"), auth.verifyToken, JobController.jobPost);

job.put("/jobs/approve-decline", checkPermissions("admin-job"), auth.verifyToken,
        JobController.approveOrDeclineJobPost);

job.get("/jobs/public", JobController.getApprovedJobsList);

job.get("/jobs/company/:companyId", checkPermissions("normal"), auth.verifyToken, JobController.getJobsListPerCompany);

job.get("/jobs/:status", checkPermissions("admin-job"), auth.verifyToken, JobController.getJobsList);

job.get("/jobs/info/:jobId", JobController.getJobInfo);

job.patch("/jobs/edit", auth.verifyToken, JobController.editJobInfo);

export default job;
