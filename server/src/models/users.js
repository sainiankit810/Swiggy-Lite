const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        default: ""
    },

    auth_token: {
        type: String,
        default: ""
    },

    google_id: {
        type: String,
        default: ""
    },

    facebook_id: {
        type: String,
        default: ""
    },
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;