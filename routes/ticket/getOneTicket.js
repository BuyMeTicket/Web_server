import Ticket from "../../models/Ticket.js";
const getOneTicket=async(req,res)=>{
    const {_id}=req.query;
    const ticket=await Ticket.find({_id});
    res.send(await ticket.getPublic());
}
export default getOneTicket;