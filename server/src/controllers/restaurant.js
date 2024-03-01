const restaurants = require('../models/restaurants');
const authValidation = require('../validation/restaurant_validation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {emailsent} = require('../helpers/index');
const mongoose = require('mongoose');

const restaurantController = {
    signup: async (req, res) => {
        const {name, email, password, address, phone, cuisine, banner, location, openingTime, closingTime} = req.body;
        try {
            const otp = Math.floor(1000 + Math.random() * 9000);
            const isValid = await authValidation.registration(req.body);
            if(isValid.error){
                return res.status(404).json({message: isValid.error.details[0].message})
            }

            const existUser = await restaurants.findOne({email});
            if(existUser){
                return res.status(404).json({message: "Restaurant already Exist."})
            }
            req.session.otp = otp;
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
        const {name, email, password, address, phone, cuisine, location, banner, openingTime, closingTime } = req.session.userData;
        if(req.session.otp === otp){
            const hashedPassword = await bcryptjs.hash(password,12);
            const newUser = await restaurants.create({name, email, password: hashedPassword, otp: otp, address, phone, cuisine, banner, location, openingTime, closingTime});
            return res.status(200).json({result: newUser})
        }
        return res.status(404).json({message: "Invalid OTP"})
    },

    login: async (req, res) => {
        const {email, phone, password} = req.body;
        try {
            const existUser = await restaurants.findOne({$or: [{email},{phone}]});
            if(!existUser){
                return res.status(404).json({message: "Restaurant don't exists"})
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
            res.status(200).json({result: existUser, access_token});
        } catch (error) {
            res.status(500).json('Something went wrong');
            console.log(error)
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;
            const existUser = await restaurants.findOne({email})
            if(!existUser){
                return res.status(404).json({message: "Restaurant don't exists"})
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
            const updatedUser = await restaurants.findOneAndUpdate({email: req.session.email}, {password: hashedPassword}, {new: true});
            return res.status(200).json({message: "Password updated successfully"});
        }
        return res.status(404).json({message: "Invalid OTP"})
    },

    resetPassword: async (req, res) => {
        const {oldPassword, newPassword} = req.body;
        const existUser = await restaurants.findById(req.user_id);
        const isPasswordcrp = await bcryptjs.compare(oldPassword, existUser.password)
        if(!isPasswordcrp){
            return res.status(404).json({message: "Invalid old password"})
        }
        const hashedPassword = await bcryptjs.hash(newPassword,12);
        const updatedUser = await restaurants.findByIdAndUpdate(req.user_id, {password: hashedPassword}, {new: true});
        return res.status(200).json({message: "Password updated successfully"});
    },

    updateProfile: async (req, res, next) => {   
        const _id = req.user_id;
        const {name, email, password, phone, address, cuisine, banner, location, openingTime, closingTime} = req.body;

        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('Please enter a valid id number');
        }

        try {
            const hashedpassword = await bcryptjs.hash(password,12);
            const updateProfile = await restaurants.findByIdAndUpdate(_id, { $set: { 'name': name, "email": email, 'password': hashedpassword, 'phone': phone, 'address': address, 'cuisine': cuisine, "banner": banner, "location": location, 'openingTime': openingTime, 'closingTime': closingTime }}, { new: true})
            res.status(200).json(updateProfile)
        } catch (error) {
            res.status(405).json({ message: error.message})
        }
    },

}

module.exports = {...restaurantController};
