import express from "express";
const router = express.Router();
import activitiesRouter from "./activity/index.js"
import ticketsRouter from "./ticket/index.js"
import poolsRouter from "./pool/index.js"
import usersRouter from "./user/index.js"
import cryptoRouter from "./crypto/index.js"
// Define the in-memory storage
const storage = {};

// Middleware to attach the storage to the request object
router.use((req, res, next) => {
    req.storage = storage;
    next();
});
router.use('/ticket',ticketsRouter);
router.use('/activity',activitiesRouter);
router.use('/pool',poolsRouter);
router.use('/user',usersRouter);
router.use('/crypto',cryptoRouter);

export default router;