import { Router } from "express";
import GenericController from "../../controllers/GenericController";
import auth from "../../middlewares/authorization_authentication.js";
import checkPermissions from "../../middlewares/checkPermissions";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 6000000, files: 1 },
});

const generic = Router();

/*
 * For getting statistics for admins on the system
 * Returns  Pending requests count,
            Users count,
            Approved companies count,
            Startups count,
            Enablers count,
            Government institutions count,
            Subscribers count
 */
generic.get(
  "/counters",
  auth.verifyToken,
  checkPermissions([
    "admin-company",
    "admin-job",
    "admin-event",
    "admin-blog",
    "admin-user",
  ]),
  GenericController.getCounts
);

/*
 * For getting statistics for registered Company
 * Returns Total number of jobs,
 *         Total number of blogs
 *         Total number of events
 */
generic.get(
  "/countersCo",
  auth.verifyToken,
  checkPermissions("normal"),
  GenericController.getCountsCo
);

generic.get(
  "/countsNew",
  auth.verifyToken,
  checkPermissions([
    "normal",
    "admin-company",
    "admin-job",
    "admin-event",
    "admin-blog",
    "admin-user",
  ]),
  GenericController.getCountsNew
);

// Search: Directory, Blogs, Events, Jobs
generic.get("/search", GenericController.search);

generic.post(
  "/upload",
  upload.single("file"),
  GenericController.upload
);

export default generic;
