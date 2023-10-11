import Activity from "../../models/Activity.js";

const getAllActivity = async (req, res) => {
    const allActivity = await Activity.find({}).select("-tickets").catch((err)=>{console.log(err)});
    if(!allActivity){
        res.status(404).send("No Activity");
        return;
    }
    res.send(allActivity.map((activity) => activity.getPublic()));
}

export default getAllActivity;