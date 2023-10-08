import User from "../../models/User.js";

const getAllUser = async (req, res) => {
    const allUser = await User.find({});
    res.send(allUser.map(async (User) => await User.getPublic()));
}

export default getAllUser;