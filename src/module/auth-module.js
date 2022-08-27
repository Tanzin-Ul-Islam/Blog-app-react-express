const users = require('../model/users');
class AuthModule {
    signUp = async (data) => {
        const user = new users(data);
        let result = await user.save();
        if (result.id) {
            let data = users.findOne({email: result.email}).select('-password -__v');
            return data;
        }
        // let email = data.email;
        // let count = await users.countDocuments({ email });
        // if (count == 0) {
        //     const newUser = await users.create({
        //         name: data.name,
        //         userName: data.userName,
        //         email: data.email,
        //         phone: data.phone,
        //         password: data.hashedPassword,
        //     });
        //     if (newUser.id) {
        //         return true
        //     }
        // } else {
        //     return false;
        // }

    }

    signIn = async (data) => {
        let user = await users.findOne({ email: data });
        return user;
    }

}

module.exports = new AuthModule();