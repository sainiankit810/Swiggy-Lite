const joi = require('joi');

const restaurantValidation = {
    registration :async (data) =>{
        const schema = joi.object({
            name: joi.string().min(3).max(30).required(),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')).required(),
            phone: joi.string().min(10).max(10).required(),
            address: joi.string().min(3).max(100).required(),
            banner: joi.string().required(),
            cuisine: joi.array().items(joi.string()),
            location: joi.object({
                type: joi.string().default('Point'),
                coordinates: joi.array().items(joi.number()).required()
            }).required(),
            openingTime: joi.string(),
            closingTime: joi.string()
        });

        return schema.validate(data);
    },

    login :async (data) =>{
        const schema = joi.object({
            phone: joi.string().min(10).max(10),
            password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')).required()
        });

        return schema.validate(data);
    }
}

module.exports = {...restaurantValidation};