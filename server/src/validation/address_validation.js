const joi = require('joi');

const addressValidation = (data) => {
    const schema = joi.object({
        user_id: joi.string(),
        address: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
        pincode: joi.number().required(),
        location: joi.object({
            type: joi.string().default('Point'),
            coordinates: joi.array().items(joi.number()).required()
        }).required()
    });
    return schema.validate(data);
}

module.exports = addressValidation;
