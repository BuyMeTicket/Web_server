import AES from 'crypto-js/aes.js';
import encUtf8 from 'crypto-js/enc-utf8.js';

const decrypt = async (req, res) => {
    const {ciphertext,address} = {...req.body};
    try {
        const key = req.storage[address]
        if (!key) {
            return res.send('Key not found.');
        }
        if (key === 'expired') {
            return res.send('Key expired.');
        }
        console.log(key);
        console.log(ciphertext);
        const decrypted = AES.decrypt(ciphertext, key);
        const originalText = decrypted.toString(encUtf8);
        console.log('origin',originalText);
        res.status(200).send(originalText);

    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
export default decrypt;