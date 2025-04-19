import Joi from "joi";

export const forgotPassword = Joi.object({
    email:Joi.string().email().required()
});