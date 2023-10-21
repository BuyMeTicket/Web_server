import Ticket from "../../models/Ticket.js";

const deleteTicket = async (req, res) => {
    console.log(req.body);
    const {_id} = req.body;
    const ticket = await Ticket.findByIdAndDelete({_id});
    if (!ticket) {
        res.status(404).send("Ticket not found");
        return;
    }
    res.send('delete success');
}

export default deleteTicket;