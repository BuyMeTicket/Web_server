
const getKey = async (req, res) => {
    const address = req.params.address;
    const key = storage[address];

    if (!key) {
        return res.status(404).send('Key not found.');
    }
    res.send({ address, key });
};
export default getKey;