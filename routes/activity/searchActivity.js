import Activity from "../../models/Activity.js"
import { findWithLimit } from "../../models/query.js"

const searchActivity = async (req, res, next) => {
    const { keywords, page, perpage } = req.query
    const query = Activity.smartQuery(keywords)
    const [acts, maxPage] = await findWithLimit(Activity, query, page, perpage || 50)
    return res.status(201).send(acts.map((act) => act.getPublic()))
}

export default searchActivity