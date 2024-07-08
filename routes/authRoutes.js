const express = require('express');
const { registerFunction, loginFunction } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', registerFunction);

// Login route
router.post('/login', loginFunction);

module.exports = router;
