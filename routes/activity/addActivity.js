import Activity from "../../models/Activity.js";
import { parseFile } from "../../models/query.js";

const addActivity = async (req, res) => {
    let tickets = JSON.parse(req.body.tickets);
    const image = parseFile(req.files[0]);
    tickets = tickets.map((ticket, index)=>({...ticket, totalAmount:parseInt(ticket.totalAmount)}));
    const totalTickets = tickets.reduce((acc,ticket)=>acc+ticket.totalAmount,0);
    const data = {...req.body, tickets, image, totalTickets };
    try {
        const newActivity =await new Activity({...data,totalTickets}).save().catch(e=>console.log("error in add activity",e));
        res.send('Activity added');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
export default addActivity;