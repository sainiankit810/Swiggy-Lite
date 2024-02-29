const joi = require('joi');

const authValidation = {
    registration :async (data) =>{
        const schema = joi.object({
            fullname: joi.string().min(3).max(30).required(),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')).required(),
            phone: joi.string().min(10).max(10).required(),
            auth_token: joi.string().default(""),
            google_id: joi.string().default(""),
            facebook_id: joi.string().default("")
        });

        return schema.validate(data);
    },

    login :async (data) =>{
        const schema = joi.object({
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            phone: joi.string().min(10).max(10),
            password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$')).required()
        });

        return schema.validate(data);
    },

    forgotPassword :async (data) =>{
        const schema = joi.object({
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        });

        return schema.validate(data);
    }


}

module.exports = {...authValidation};