const AuthModule = require('../module/auth-module');
const users = require('../model/users');
const bcrypt = require('bcryptjs');
const JwtHelper = require('../helper/jwt-helper');
class AuthController {
    signUp = async (req, res) => {
        try {
            let data = req.body
            data.password = this.hashPassword(data.password);
            let email = data.email;
            let userName = data.userName
            let emailCount = await users.countDocuments({ email });
            let userNameCount = await users.countDocuments({ userName });
            if (emailCount == 0 && userNameCount == 0) {
                let user = await AuthModule.signUp(data);
                if (user.id) {
                    let param = {
                        id: user.id,
                        email: user.email
                    }
                    const token = JwtHelper.generateToken(param)
                    res.status(201).send({ token: token, msg: "user created and logged in successfully.", data: user });
                } else {
                    res.status(400).send({ msg: "Could not create user!! Please try again.", user: false });
                }
            } else {
                let msg = "";
                if (emailCount > 0) {
                    msg += "Email already exist!!"
                }
                if (userNameCount > 0) {
                    msg += "User name already exist"
                }
                res.status(400).send({ msg: msg });
            }

        } catch (error) {
            res.status(400).send({ msg: "Something went wrong!!" })
        }
    }

    signin = async (req, res) => {
        try {
            let data = req.body
            const user = await AuthModule.signIn(data.email);
            if (!user) {
                res.status(400).send({ msg: "Email is not correct." });
                return;
            }
            const checkPassword = await bcrypt.compare(data.password, user.password);
            if (!checkPassword) {
                res.status(400).send({ msg: "Invalid password." });
                return;
            }
            let param = {
                id: user.id,
                email: user.email
            }
            const token = JwtHelper.generateToken(param)
            const { password, ...responseUser } = user._doc;
            res.status(200).send({ token: token, msg: "Successfully Logged In!!.", data: responseUser });
        } catch (error) {
            res.status(400).send({ msg: "Something went wrong!!" })
        }
    }

    hashPassword(pass) {
        let salt = bcrypt.genSaltSync(10);
        let hashedPass = bcrypt.hashSync(pass, salt);
        return hashedPass;
    }
}


module.exports = new AuthController();