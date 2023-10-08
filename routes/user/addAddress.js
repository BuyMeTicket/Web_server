import User from "../../models/User.js";
const addAddress = async(req,res)=>{
    const {user} = req.body;
    try {
        // Create a new String with the String
        if(!user) return res.status(400).json({ success: false, error:"User is required" });
        const newAddress = new User({
            user:user,
            register:true,
        });
        // Save the Address
        await newAddress.save();
        // Return success
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
    }
}
export default addAddress;