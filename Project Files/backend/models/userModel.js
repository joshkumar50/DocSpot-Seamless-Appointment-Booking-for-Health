// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }, // <-- ADDED THIS LINE
    isAdmin: { type: Boolean, default: false },
    isDoctor: { type: Boolean, default: false },
    notification: { type: Array, default: [] },
    seennotification: { type: Array, default: [] },
}, { timestamps: true }); // It's good practice to add timestamps

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;