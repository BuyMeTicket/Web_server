import express from "express";

const router = express.Router();
import addActivity from "./addActivity.js";
import getAllActivities from "./getAllActivities.js";
import getOneActivity from "./getOneActivity.js";
import getOwnActivity from "./getOwnActivities.js";
import updateActivity from "./updateActivity.js";
import deleteActivity from "./deleteActivity.js";
import searchActivity from "./searchActivity.js";
router.get("/", getOneActivity)
router.post("/add", addActivity)
router.put("/update", updateActivity)
router.get("/all", getAllActivities)
router.get("/own", getOwnActivity)
router.delete("/delete", deleteActivity)
router.get("/search", searchActivity)
export default router;