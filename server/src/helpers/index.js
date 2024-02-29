const nodemailer = require('nodemailer');

const randomStr = (len, arr) => {
    var digits = arr;
    let OTP = '';
    for (let i = 0; i < len; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    if (OTP.length < len || OTP.length > len) {
        randomStr(len, arr);
    }
    return (OTP);
}

const showResponse = (status, message, data = null, other = null, code = null) => {
    let response = {}
    response.status = status
    response.message = message
    if (data !== null) {
        response.data = data
    }
    if (other !== null) {
        response.other = other
    }
    if (code !== null) {
        response.code = code
    }
    return response;
}

const showOutput = (res, response, code) => {
    delete response.code;
    res.status(code).json(response);
}

const emailsent = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "sainiankit8102001@gmail.com",
            pass: "qmio famq tclr osuu"
        },
    });

    await transporter.sendMail({
        from: "sainiankit8102001@gmail.com",
        to: email,
        subject: 'Forgot password',
        html: "<b>Greetings, </b><br /><br />Here is your 4 Digits reset password Code<br />" +
            "<h2>" + otp + "</h2><br /><br /><label><small>Please use this code for Authorization." +
            "</small></label><br /><br /><label>Thanks & Regards</label><br /><label>Pickup Player" +
            "Community</label>",
    }, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }
    )
};


module.exports = {
    randomStr,
    showResponse,
    showOutput,
    emailsent
}