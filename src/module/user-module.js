const users = require('../model/users');
class UserModule {
    getUserData = async (param) => {
        const data = await users.findOne({ email: param.email }).select('-password -__v');
        if (data) {
            return data;
        }
    }
    updateProfile = async (param, data) => {
        let { name, userName, phone, fileName, gender, address } = data;
        const filter = { email: param.email };
        const update = { name: name, userName: userName, phone: phone, profilePic: fileName, gender: gender, address: address };
        const result = await users.findOneAndUpdate(filter, update, { new: true });
        return result;
    }
}

module.exports = new UserModule;