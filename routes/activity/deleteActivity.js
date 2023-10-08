import Activity from "../../models/Activity.js";
import Ticket from "../../models/Ticket.js";

const deleteActivity=async(req,res)=>{
    const target=req.query;
    const activity=await Activity.find({...target})
    if(!activity){
        res.status(404).send("Activity not found");
        return;
    }
    await Ticket.deleteMany({activity:activity._id})
    await Activity.deleteMany({...target})
    res.send('delete success');
}
export default deleteActivity;