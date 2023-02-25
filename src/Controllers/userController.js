const User =  require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {roles} = require('../../roles')


async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
   }
    
   async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
   }

exports.signup = async (req, res) => {
    try {
        const { email, password, role } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword, role: role || "guest" });
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.SECRET, {
         expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
         data: newUser,
         accessToken
        })
       } catch (error) {
        res.status(500).send(error.message)
       }
    
}

exports.login = async (req, res) => {
    try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return next(new Error('Email does not exist'));
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) return next(new Error('Password is not correct'))
     const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1d"
     });
     await User.findByIdAndUpdate(user._id, { accessToken })
     res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken
     })
    } catch (error) {
        res.status(500).send('error.message')
    }
}
exports.getUsers = async (req, res, next) => {
 const users = await User.find({});
 res.status(200).json({
  data: users
 });
}
 
exports.getUser = async (req, res) => {
 try {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) return next(new Error('User does not exist'));
   res.status(200).json({
   data: user
  });
 } catch (error) {
    res.status(500).send(error.message)
 }
}
 
exports.updateUser = async (req, res) => {
 try {
  const update = req.body
  const userId = req.params.userId;
  await User.findByIdAndUpdate(userId, update);
  const user = await User.findById(userId)
  res.status(200).json({
   data: user,
   message: 'User has been updated'
  });
 } catch (error) {
    res.status(500).send(error.message)
 }
}
 
exports.deleteUser = async (req, res) => {
 try {
  const userId = req.params.userId;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
   data: null,
   message: 'User has been deleted'
  });
 } catch (error) {
    res.status(500).send(error.message)
 }
}

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
     try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      next()
     } catch (error) {
        res.status(500).send(error.message)
     }
    }
   }
    
   exports.allowIfLoggedin = async (req, res) => {
    try {
     const user = res.locals.loggedInUser;
     if (!user)
      return res.status(401).json({
       error: "You need to be logged in to access this route"
      });
      req.user = user;
      next();
     } catch (error) {
        res.status(500).send(error.message)
     }
   }
