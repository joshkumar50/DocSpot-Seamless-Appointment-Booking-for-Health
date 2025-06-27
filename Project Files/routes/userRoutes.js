// backend/routes/userRoutes.js
const express = require('express');
const { 
    loginController, 
    registerController, 
    authController, 
    applyDoctorController,
    getAllDoctorsController // <-- ADD THIS TO THE IMPORT LIST
} = require('../controllers/userCtrl');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/login', loginController);
router.post('/register', registerController);

// Protected Routes
router.post('/getUserData', authMiddleware, authController);
router.post('/apply-doctor', authMiddleware, applyDoctorController);
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController); // This line will now work

module.exports = router;