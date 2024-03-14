//models 
const User = require('../models/userModel.js');

//utils
const { verifyToken } = require('../utils/handleJWT.js');

const authMiddleware = async(req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json({
            ok: false, 
            error: "Authorization token is required",
            data: {}
        });
    }
    
    const token = authorization.split(' ')[1];
    try { 
        const data = verifyToken(token);
        if (!data) {
            return res.status(401).json({
                ok: false, 
                error: "Request is not authorized",
                data: {}
            });
        }
        
        const { email } = data;

        console.log("data : ", data);
        req.user = await User.findOne({ email });
        req.receivedToken = token;

        if (!req.user) {
            return res.status(404).json({
                ok: false, 
                error: "User does not exist",
                data: {}
            });
        }

        next();
    } catch (err) {
        console.log(`ERROR (auth-middleware): ${err.message}`);
        return res.status(401).json({
            ok: false, 
            error: "Request is not authorized",
            data: {}
        });
    }
};

module.exports = authMiddleware;