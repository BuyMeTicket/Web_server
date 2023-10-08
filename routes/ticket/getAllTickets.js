import Ticket from "../../models/Ticket.js";

const getAllTicket = async (req, res) => {
    const allTicket = await Ticket.find({});
    res.send(allTicket.map(async (ticket) => await ticket.getPublic()));
}

export default getAllTicket;