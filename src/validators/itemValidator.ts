import Joi from "joi"

const reviewSchema = Joi.object().keys({
  rating: Joi.number().required().min(0).max(5),
  comment: Joi.string().required().min(1)
});

const rentSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  rentedAt: Joi.date().required(),
  return_date: Joi.date().allow(null),
  reviews: Joi.array().items(reviewSchema)
});

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
  rent: Joi.array().items(rentSchema),
  sale: saleSchema
});

export default itemSchema
