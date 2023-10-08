import express from "express";
const router = express.Router();
import buyTicket from "./buyTicket.js";
import getAllTickets from "./getAllTickets.js";
import getOneTicket from "./getOneTicket.js";
import getOwnTicket from "./getOwnTickets.js";
import deleteTicket from "./deleteTicket.js";
import useTicket from "./useTicket.js";

router.post("/buy", buyTicket)
router.get("/all", getAllTickets)
router.get("/", getOneTicket)
router.get("/own", getOwnTicket)
router.delete("/delete", deleteTicket)
router.post("/use", useTicket)

export default router;