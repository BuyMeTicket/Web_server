import Activity from "../../models/Activity.js";

const addActivity = async (req, res) => {
    let tickets = JSON.parse(req.body.tickets);
    tickets = tickets.map((ticket, index)=>({...ticket, totalAmount:parseInt(ticket.totalAmount)}));
    const totalTickets = tickets.reduce((acc,ticket)=>acc+ticket.totalAmount,0);
    const data = JSON.parse(req.body.data);
    try {
        const newActivity =await new Activity({...data,totalTickets}).save();
        res.send('Activity added');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
export default addActivity;