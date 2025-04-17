import Joi from "joi";

export const CategorySchema = Joi.object({
    name: Joi.string().required(),
    shelve: Joi.string().required()
});