import Ticket from "../../models/Ticket.js";

const deleteTicket = async (req, res) => {
    const target = req.query;
    const ticket = await Ticket.findOneAndDelete(target);
    if (!ticket) {
        res.status(404).send("Ticket not found");
        return;
    }
    res.send('delete success');
}

export default deleteTicket;