import { Router } from "express";
import BusinessActivities from "../../controllers/BusinessActivities";

const activities = Router();

activities.get("/business-activities", BusinessActivities.getBusinessActivities);

export default activities;
