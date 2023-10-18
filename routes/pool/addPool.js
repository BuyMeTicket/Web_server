import Pool from "../../models/Pool.js";

const addPool = async (req, res) => {
    const data = {...req.body};
    try {
        const newPool = await new Pool(data).save();
        res.send('Pool added');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
export default addPool;