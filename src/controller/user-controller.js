const users = require('../model/users');
const UserModule = require('../module/user-module');
class UserController {
    getUserData = async (req, res) => {
        let userCredential = res.locals.userInfo;
        let result = await UserModule.getUserData(userCredential);
        if (result) {
            res.status(200).send({ msg: "User data fectched successfully.", data: result });
        } else {
            res.status(400).send({ msg: "No data found!" });
        }

    }

    updateProfile = async (req, res) => {
        let fileName = null;
        if (Object.values(req.files).length > 0) {
            fileName = req.files.image[0].filename;
        } else {
            fileName = req.body.image
        }
        req.body.fileName = fileName;
        let userCredential = res.locals.userInfo;
        let result = await UserModule.updateProfile(userCredential, req.body);
        if (result) {
            res.status(200).send({ msg: "Profile update successfully!!", data: result });
        } else {
            res.status(400).send({ msg: "Could not update profile successfully!!" });

        }
    }
}

module.exports = new UserController;