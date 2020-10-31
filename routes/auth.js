const express = require('express')
const app = express.Router()
const authController = require('../controller/authController');

app.post('/register', authController.register)
app.post('/login', authController.login)
app.post('/profile', authController.profile);

module.exports = app;