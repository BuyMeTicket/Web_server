import Ticket from "../../models/Ticket.js";

const deleteTicket = async (req, res) => {
    console.log(req.query);
    const {_id} = req.query;
    const ticket = await Ticket.findByIdAndDelete({_id});
    if (!ticket) {
        res.status(404).send("Ticket not found");
        return;
    }
    res.send('delete success');
}

export default deleteTicket;