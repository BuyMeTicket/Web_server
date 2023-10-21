import Ticket from "../../models/Ticket.js";

const deleteTicket = async (req, res) => {
    const { id } = req.body;  // Extract id from request body
    try {
        await Ticket.findByIdAndDelete(id);
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
    res.send('delete success');
}

export default deleteTicket;