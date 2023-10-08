import Ticket from "../../models/Ticket.js";
import Activity from "../../models/Activity.js";

const buyTicket = async (req, res) => {
    const { quantity, data } = req.body;
    // const totalTickets = data.tickets.reduce((acc,cur)=>acc+cur.totalAmount,0);
    if(data._id) delete data._id;
    try {
        await Activity.findByIdAndUpdate(data.activity, {$inc: {'tickets.$[elem].soldAmount': quantity}}, {arrayFilters: [{'elem.name': data.name}]})
        await new Ticket({...data, quantity}).save().catch(e=>console.log("error in add activity",e));
        // increase soldAmount of the specific ticket among many tickets in one activity
        res.send('Buy Ticket Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
export default buyTicket;