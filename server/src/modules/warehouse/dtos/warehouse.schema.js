import Joi from "joi"


export const warehouseSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    owner: Joi.string().required()
})