import Pool from "../../models/Pool.js";

const getPool = async (req, res) => {
    const { _id} = req.query;
    try {
        const pool = await Pool.findByIdAndUpdate({_id},{$inc:{watches:1}}).catch((err)=>{console.log(err)});
        if (!pool) throw new Error("Pool not found");
        res.send(pool.getPublic());
    } catch (error) {
        res.status(400).send(error.message);
    }
}
export default getPool;