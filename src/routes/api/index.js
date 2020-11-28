import express from "express";
import users from "./users";
import company from "./company";
import events from "./events";
import job from "./job";
import blog from "./blog";
import subscribe from "./subscribe";

const router = express.Router();

router.use("/", users);
router.use("/", company);
router.use("/", events);
router.use("/", job);
router.use("/", blog);
router.use("/", subscribe);

export default router;