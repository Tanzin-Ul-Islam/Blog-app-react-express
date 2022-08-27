const users = require('../model/users');
const JwtHelper = require('../helper/jwt-helper');

async function AuthGuard(req, res, next) {
    let authToken = req.headers.authorization;
    if (authToken) {
        authToken = authToken.split('Bearer ')[1]
        let verifyToken = JwtHelper.verifyToken(authToken);
        if (verifyToken) {
            let verifyUser = await users.findOne({ email: verifyToken.email });
            if (verifyUser) {
                let userInfo = {id: verifyUser.id, email: verifyUser.email, userName: verifyUser.userName}
                res.locals.userInfo = userInfo;
                next();
            } else {
                res.status(400).send("User Not Verified!!");
            }
        }


    } else {
        res.status(400).send("Forbidden Access!!");
    }

}

module.exports = { AuthGuard }
