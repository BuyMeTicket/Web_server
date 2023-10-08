import Ticket from "../../models/Ticket.js";

const useTicket = async (req, res) => {
    const { data } = req.body;
    
    console.log(data);

    const id = data.split('/')[0];
    const ticketHolder = data.split('/')[1];
    const ticketName = data.split('/')[2];
    console.log(id);
    console.log(ticketHolder);
    console.log(ticketName);
    //check if the ticket is valid
    const ticket = await Ticket.findOne({ owner: ticketHolder, name: ticketName, activity:id });
    if (!ticket) {
        return res.status(404).send('Ticket not found.');
    }
    if (ticket.status === "used") {
        return res.status(400).send('Ticket already used.');
    }
    await Ticket.findOneAndUpdate({ owner: ticketHolder, name: ticketName, activity:id }, { $set: { status:"used" } });
    res.status(200).send('Ticket used.');
}

export default useTicket;