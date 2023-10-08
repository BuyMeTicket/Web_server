import Pool from "../../models/Pool.js";
import { parseFile } from "../../models/query.js";

const addPool = async (req, res) => {
    const image = parseFile(req.file);
    const data = {...req.body, image};
    try {
        const newPool = await new Pool(data).save().catch(e=>console.log("error in add pool",e));
        res.send('Pool added');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
export default addPool;