import express from "express";
import generic from "./generic";
import users from "./users";
import company from "./company";
import events from "./events";
import job from "./job";
import blog from "./blog";
import subscribe from "./subscribe";
import messages from "./messages";
import businessActivities from "./businessActivities";
import companyTypes from "./companyTypes";
import activitiesOfCompany from "./activitiesOfCompany";
import audienceForPost from "./audienceForPost";
import companyCategories from "./companyCategories";
import eventsTypes from "./eventsTypes";

const router = express.Router();

router.use("/", generic);
router.use("/", users);
router.use("/", company);
router.use("/", events);
router.use("/", job);
router.use("/", blog);
router.use("/", subscribe);
router.use("/", messages);
router.use("/", businessActivities);
router.use("/", companyTypes);
router.use("/", activitiesOfCompany);
router.use("/", audienceForPost);
router.use("/", companyCategories);
router.use("/", eventsTypes);

export default router;
