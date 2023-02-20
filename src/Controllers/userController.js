const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const {SECRET} = process.env;
const expiry = 36000



exports.authRole = (req, res, next)=> {
    
}