import Pool from "../../models/Pool.js";

const getOwnPools = async (req, res) => {
    const { holder } = req.query;
    try {
        const pools = await Pool.find({ holder }).catch((err)=>{console.log(err)});
        if (!pools) throw new Error("No pools found");
        res.send(pools.map(pool=>pool.getPublic()));
    } catch (error) {
        res.status(400).send(error.message);
    }
}
export default getOwnPools;