import Pool from "../../models/Pool.js";
import { findWithLimit } from "../../models/query.js";

const searchPool = async (req, res, next) => {
    const { keywords, page, perpage } = req.query
    const query = Pool.smartQuery(keywords)
    const [pools, maxPage] = await findWithLimit(Pool, query, page, perpage || 50)
    return res.status(201).send(pools.map((pool) => pool.getPublic()))
}

export default searchPool