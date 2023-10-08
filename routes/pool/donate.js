import Pool from "../../models/Pool.js";

const donate = async (req, res) => {
    const { _id, amount, donator } = req.body;
    try {
        // add amount to pool's currentPrice and push donator to pool's donators if the donator address is not in the pool's donators address list,if the donator address is in the pool's donators address list, update the amount of the donator
        const pool = await Pool.findById(_id).catch((err)=>{console.log(err)});
        if (!pool) throw new Error("Pool not found");
        const donators = pool.donators;
        let isDonator = false;
        for (let i = 0; i < donators.length; i++) {
            if (donators[i].address === donator) {
                donators[i].amount += amount;
                isDonator = true;
                break;
            }
        }
        if (!isDonator) {
            donators.push({address: donator, amount: amount});
        }
        // update pool
        pool.currentPrice += amount;
        pool.donators = donators;
        const newPool = await pool.save().catch((err)=>{console.log(err)});

        res.send(newPool.getPublic());
    } catch (error) {
        res.status(400).send(error.message);
    }
}
export default donate;