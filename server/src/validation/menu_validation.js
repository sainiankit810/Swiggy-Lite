const joi = require('joi');

const menuValidation = (data) => {
    const schema = joi.object({
        item_name: joi.string().required(),
        item_price: joi.number().required(),
        item_description: joi.string(),
        item_category: joi.string().required(),
        item_image: joi.string(),
        item_availability: joi.boolean().default(true),
        item_vegan: joi.boolean().default(true),
    });
    return schema.validate(data);
}

module.exports = menuValidation;
