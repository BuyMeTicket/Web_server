//delete donator in db
import Pool from "../../models/Pool.js";

const deleteDonator = async (req, res) => {
    const { _id,donator:address} = req.body;
    try {
        //delete donator in db
        const pool = await Pool.findByIdAndUpdate(
            _id,
            { $pull: { donators: { address: address } } },  // Specify the field to match against the address
            { new: true }  // Return the updated document
        ).catch((err) => {
            console.log(err);
        });
        if (!pool) throw new Error("Pool not found");
        res.send(pool.getPublic());
    } catch (error) {
        res.status(400).send(error.message);
    }
}
export default deleteDonator;