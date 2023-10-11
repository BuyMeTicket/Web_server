import Pool from "../../models/Pool.js";

const getAllPools = async (req, res) => {
    try {
        const pools = await Pool.find({});
        if (!pools) throw new Error("No pools found");
        res.send(pools.map(pool=>pool.getPublic()));
    } catch (error) {
        res.status(400).send(error.message);
    }
}
export default getAllPools;