const Joi = require('@hapi/joi');

// Register validation
exports.registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi
            .string()
            .max(100)
            .required(),
        lastName: Joi
            .string()
            .max(100)
            .required(),
        email: Joi
            .string()
            .email()
            .required(),
        password: Joi
            .string()
            .min(8)
            .required()
    });
    return schema.validate(data);
};

// Login validation
exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi
            .string()
            .email()
            .required(),
        password: Joi
            .string()
            .min(8)
            .required()
    });
    return schema.validate(data);
};