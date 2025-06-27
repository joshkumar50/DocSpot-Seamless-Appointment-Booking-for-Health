// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Server Issue ${error}`);
    }
};

module.exports = connectDB;
