const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const secret = process.env.SECRET_KEY; 
    const options = { expiresIn: '2h' }; 
    
    return jwt.sign(payload, secret, options);
};

const verifyToken = async() => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded; 
    } catch (err) {
        console.error(`ERROR (token_verify) : ${err.message}`);
        return null;
    }
};

module.exports = { 
    generateToken, verifyToken 
};