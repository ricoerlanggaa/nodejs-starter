const jwt = require("jsonwebtoken");
require('dotenv').config()

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    
    token = token.replace(/^Bearer\s+/, "");

    if (token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Token is not valid'
            });
        }
        req.decoded = decoded;
        next();
    });
    } else {
        return res.json({
            success: false,
            message: 'Token not provided'
        });
    }
}

const authJwt = {
    verifyToken: verifyToken,
};

module.exports = authJwt;
  