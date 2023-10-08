const expireKey = (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).send('Address is required.');
    }
    // Save the key in the in-memory storage
    req.storage[address] = 'expired';
    console.log(req.storage[address]);
    res.send('Key saved successfully.');
}

export default expireKey;