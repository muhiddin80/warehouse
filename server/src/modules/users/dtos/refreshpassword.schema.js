import Joi from "joi";

export const forgotPasswordSchema = Joi.object({
    email:Joi.string().email().required()
});

export const refreshPasswordSchema = Joi.object({
    password:Joi.string().min(4).max(10).required()
});