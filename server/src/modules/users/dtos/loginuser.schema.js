import Joi from "joi";

export const loginUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});