import express from 'express';
import addPool from "./addPool.js";
import getOwnPools from "./getOwnPools.js";
import getAllPools from "./getAllPools.js";
import getOnePool from "./getOnePool.js";
import donate from "./donate.js";
import getFundPools from './getfundPools.js';
import redeem from './redeem.js';
import searchPool from './searchPool.js';

const router = express.Router();
router.post("/add", addPool)
router.post("/donate", donate)
router.get("/own", getOwnPools)
router.get("/all", getAllPools)
router.get("/", getOnePool)
router.get("/fund",getFundPools)
router.post("/redeem",redeem)
router.get("/search", searchPool)

export default router;