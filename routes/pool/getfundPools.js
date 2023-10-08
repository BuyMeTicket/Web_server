import Pool from "../../models/Pool.js";

const getFundPools = async (req, res) => {
    const { address } = req.query; 

    try {
        // Find all pools where the provided address is in the donators array
        const pools = await Pool.find({ "donators.address": address });
        if (!pools) throw new Error("No pools found");
        res.send(pools.map(pool=>pool.getPublic()));
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default getFundPools;
