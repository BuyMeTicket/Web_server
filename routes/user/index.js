import express from "express";
const router = express.Router();
import addAddress from "./addAddress.js";
import getAllUser from "./getAllAddresses.js";
import expireKey from "./expireKey.js";
import getKey from "./getKey.js";

router.post("/expire",expireKey)
router.get("/get/:address",getKey)
router.post("/add", addAddress)
router.get("/all", getAllUser)
export default router;