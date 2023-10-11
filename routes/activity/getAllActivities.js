import Activity from "../../models/Activity.js";

const getAllActivity = async (req, res) => {
    const allActivity = await Activity.find({});
    if(!allActivity){
        res.status(404).send("No Activity");
        return;
    }
    res.send(allActivity.map((activity) => activity.getPublic()));
}

export default getAllActivity;