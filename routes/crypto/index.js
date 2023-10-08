import express from 'express';
import encrypt from "./encrypt.js";
import decrypt from "./decrypt.js";

const router = express.Router();
router.post("/encrypt", encrypt)
router.post("/decrypt", decrypt)

export default router;