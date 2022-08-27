const mongoose = require('mongoose');
require('dotenv').config();
const Connetction = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        console.log("Db connection created successfully!!");
    } catch (error) {
        console.log("Error while connection to database!!Error:" + error);
    }
}


module.exports = Connetction;