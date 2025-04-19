import Joi from "joi"


export const goodsSchema = Joi.object({
    name: Joi.string().required(),
    imageUrl: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    volume: Joi.number().required(),
    volume_type: Joi.string()
})