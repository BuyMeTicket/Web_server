import Activity from "../../models/Activity.js";

const updateActivity = async (req, res) => {
    const { _id, item } = req.body;
    const activity = await Activity.findById(_id);
    if(!activity) throw new Error('Activity not found');
    const newAct = await Activity.findOneAndUpdate({_id}, item)
    res.send(newAct.getPublic());
}

export default updateActivity;