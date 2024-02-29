const users = require('../models/users');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authValidation = require('../validation/user_validation');
const {emailsent} = require('../helpers/index');

// update only when user is login

const userController = {
    signup: async (req, res) => {
        const {fullname, email, phone, password} = req.body;
        try {
            const otp = Math.floor(1000 + Math.random() * 9000);
            const isValid = await authValidation.registration(req.body);
            if(isValid.error){
                return res.status(404).json({message: isValid.error.details[0].message})
            }
            const existUser = await users.findOne({$or: [{email},{phone}]});
            if(existUser){
                return res.status(404).json({message: "User already Exist."})
            }
            req.session.otp = otp;
            console.log(req.session.otp)
            req.session.userData = req.body;
            await emailsent(req.body.email,otp);
            return res.status(200).json({message: "OTP sent to your email"})
            
        } catch (error) {
            res.status(500).json('Something went wrong');
            console.log(error)
        }
    },

    verifyOtp: async (req, res) => {
        const {otp} = req.body;
        console.log(req.session.otp)
        console.log(req.session.userData)
        const {fullname, email, password, phone  } = req.session.userData;
        if(req.session.otp === otp){
            const hashedPassword = await bcryptjs.hash(password,12);
            const newUser = await users.create({fullname, email, password: hashedPassword, phone, otp: otp, auth_token, google_id, facebook_id});
            return res.status(200).json({result: newUser})
        }
        return res.status(404).json({message: "Invalid OTP"})
    },

    login: async (req, res) => {
        const {email, phone, password} = req.body;
        try {
            const existUser = await users.findOne({$or: [{email},{phone}]});
            if(!existUser){
                return res.status(404).json({message: "User don't exists"})
            }
            const isPasswordcrp = await bcryptjs.compare(password, existUser.password)
            if(!isPasswordcrp){
                return res.status(404).json({message: "Invalid credentials"})
            }
            const access_token = jwt.sign({email: existUser?.email,_id:existUser?._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'})
            // Update user's token in the database
            existUser.auth_token = access_token;
            await existUser.save();

            res.header("authorization","bearer " + access_token)
            res.status(200).json({result: existUser,access_token});
        } catch (error) {
            res.status(500).json('Something went wrong');
            console.log(error)
        }
    },

    updateProfile: async (req, res, next) => {   
        const _id = req.user_id;
        const {fullname, email, password, phone} = req.body;

        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('Please enter a valid id number');
        }

        try {
            const updateProfile = await users.findByIdAndUpdate(_id, { $set: { 'fullname': fullname, "email": email, 'password': password, 'phone': phone }}, { new: true})
            res.status(200).json(updateProfile)
        } catch (error) {
            res.status(405).json({ message: error.message})
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;
            const existUser = await users.findOne({email})
            if(!existUser){
                return res.status(404).json({message: "User don't exists"})
            }
            const otp = Math.floor(1000 + Math.random() * 9000);
            req.session.otp = otp;
            req.session.email = email;
            await emailsent(email,otp);
            return res.status(200).json({message: "OTP sent to your email"})

        } catch (error) {
            res.status(500).json('Something went wrong');
            console.log(error)
        }
    },

    verifyForgotPasswordOtp: async (req, res) => {
        const {otp, password} = req.body;
        if(req.session.otp === otp){
            const hashedPassword = await bcryptjs.hash(password,12);
            const updatedUser = await users.findOneAndUpdate({email: req.session.email}, {password: hashedPassword}, {new: true});
            return res.status(200).json({message: "Password updated successfully"});
        }
        return res.status(404).json({message: "Invalid OTP"})
    },

    resetPassword: async (req, res) => {
        const {oldPassword, newPassword} = req.body;
        const existUser = await users.findById(req.user_id);
        const isPasswordcrp = await bcryptjs.compare(oldPassword, existUser.password)
        if(!isPasswordcrp){
            return res.status(404).json({message: "Invalid old password"})
        }
        const hashedPassword = await bcryptjs.hash(newPassword,12);
        const updatedUser = await users.findByIdAndUpdate(req.user_id, {password: hashedPassword}, {new: true});
        return res.status(200).json({message: "Password updated successfully"});
    },
}

module.exports = {...userController}