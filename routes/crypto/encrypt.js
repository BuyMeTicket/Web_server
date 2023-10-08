
import AES from 'crypto-js/aes.js';

const encrypt = async (req, res) => {
    const { data: input, address: address } = { ...req.body };
    //create a key
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // Save the key in the in-memory storage
    req.storage[address] = key;
    try {
        console.log(key);
        console.log(input);
        const ciphertext = AES.encrypt(JSON.stringify(input), key).toString();
        console.log(ciphertext);
        res.status(200).send(ciphertext);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
export default encrypt;