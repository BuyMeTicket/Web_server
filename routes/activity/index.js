import express from "express";
import fileProcess from "../../middleware/fileProcess.js";

const router = express.Router();
import addActivity from "./addActivity.js";
import getAllActivities from "./getAllActivities.js";
import getOneActivity from "./getOneActivity.js";
import getOwnActivity from "./getOwnActivities.js";
import updateActivity from "./updateActivity.js";
import deleteActivity from "./deleteActivity.js";

router.get("/", getOneActivity)
router.post("/add", fileProcess('files[]'), addActivity)
router.put("/update", fileProcess('files[]'), updateActivity)
router.get("/all", getAllActivities)
router.get("/own", getOwnActivity)
router.delete("/delete", deleteActivity)

export default router;