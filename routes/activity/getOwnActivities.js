import Activity from "../../models/Activity.js";

const getOwnActivities = async (req, res) => {
    const { holder } = req.query;
    const myActivity = await Activity.find({holder});
    if (!myActivity) throw new Error("No activities found");
    res.send(myActivity.map((activity)=>activity.getPublic()));
}

export default getOwnActivities;