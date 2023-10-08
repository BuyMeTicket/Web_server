import Activity from "../../models/Activity.js";
const getOneActivity=async(req,res)=>{
    const {_id}=req.query;
    const activity=await Activity.findByIdAndUpdate({_id},{$inc:{watches:1}})
    if(!activity){
        res.status(404).send("Activity not found");
        return;
    }
    res.send(activity.getPublic());
}
export default getOneActivity;