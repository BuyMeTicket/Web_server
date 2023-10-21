import Ticket from "../../models/Ticket.js";

const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        // Check if the id is valid
        const existedTicket= await Ticket.findById(id);
        if (!existedTicket) {
            return res.status(404).json({ message: "Ticket not found!" });
        }
        // Delete the todo
        await  Ticket.findByIdAndDelete(id);
        return res.status(200).json({ message: "Ticket deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.send('delete success');
}

export default deleteTicket;