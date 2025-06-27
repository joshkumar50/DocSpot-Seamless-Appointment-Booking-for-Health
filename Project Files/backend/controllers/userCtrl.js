const userModel = require('../models/userModel');
const doctorModel = require('../models/doctorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ message: 'User Already Exists', success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: 'Registered Successfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` });
    }
};

// Login
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email or Password', success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({ message: 'Login Success', success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
};

// ===============================================
// AUTH CONTROLLER - REFINED LOGIC
// ===============================================
const authController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(200).send({
                message: "User not found",
                success: false,
            });
        } else {
            // It's good practice to not send the password back, even if it's hashed
            user.password = undefined;
            res.status(200).send({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Auth Error',
            success: false,
            error,
        });
    }
};

// Apply Doctor
const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' });
        await newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        // Handle case where no admin user is found
        if (!adminUser) {
            return res.status(201).send({ success: true, message: 'Doctor Account Applied Successfully (No admin to notify)' });
        }
        const notification = adminUser.notification;
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({ success: true, message: 'Doctor Account Applied Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error while applying for doctor' });
    }
};

// Get All Approved Doctors (for user homepage)
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: 'approved' });
        res.status(200).send({
            success: true,
            message: "Doctors list fetched successfully",
            data: doctors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching doctors list"
        });
    }
};

module.exports = { 
    loginController, 
    registerController, 
    authController, 
    applyDoctorController, 
    getAllDoctorsController
};