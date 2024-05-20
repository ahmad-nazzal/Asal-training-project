import Joi from "joi"



const saleSchema = Joi.object().keys({
  user_id: Joi.string().required()
});

const itemSchema = Joi.object().keys({
  name: Joi.string().required(),
  owner_id: Joi.string().required(),
  description: Joi.string().required().min(1),
  available: Joi.boolean().required(),
  type: Joi.string().valid('sale', 'rent', 'sale and rent').required(),
  price_per_day: Joi.number().when('type', { is: 'rent', then: Joi.required(), otherwise: Joi.optional() }),
  price: Joi.number(),
  category_id: Joi.string().required(),
  sale: saleSchema
});

export default itemSchema
