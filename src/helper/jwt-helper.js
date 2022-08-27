const jwt = require('jsonwebtoken');
require('dotenv').config();

class JwtHelper {
    generateToken = (params) => {
        const token = jwt.sign(params, process.env.JWT_SECRET)
        return token;
    }
    verifyToken = (token)=>{
        const result = jwt.verify(token, process.env.JWT_SECRET);
        return result;
    }
}

module.exports = new JwtHelper;