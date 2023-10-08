import Ticket from "../../models/Ticket.js";

const getOwnTickets = async (req, res) => {
    const { owner } = req.query;
    const myTickets = await Ticket.find({owner});
    const publicTickets = await Promise.all(myTickets.map(async (ticket) => await ticket.getPublic()));
    res.send(publicTickets);
}

export default getOwnTickets;