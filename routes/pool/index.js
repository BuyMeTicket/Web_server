import express from 'express';
import fileProcess from "../../middleware/fileProcess.js";
import addPool from "./addPool.js";
import getOwnPools from "./getOwnPools.js";
import getAllPools from "./getAllPools.js";
import getOnePool from "./getOnePool.js";
import donate from "./donate.js";
import getFundPools from './getfundPools.js';
import redeem from './redeem.js';

const router = express.Router();
router.post("/add", fileProcess('file'), addPool)
router.post("/donate", donate)
router.get("/own", getOwnPools)
router.get("/all", getAllPools)
router.get("/", getOnePool)
router.get("/fund",getFundPools)
router.post("/redeem",redeem)


export default router;