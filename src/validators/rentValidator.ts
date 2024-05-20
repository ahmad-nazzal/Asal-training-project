import Joi from "joi";

const reviewSchema = Joi.object().keys({
  rating: Joi.number().required().min(0).max(5),
  comment: Joi.string().required().min(1)
});

const rentSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  item_id: Joi.string().required(),
  rentedAt: Joi.date().required(),
  return_date: Joi.date().allow(null),
  reviews: Joi.array().items(reviewSchema)
});

export default rentSchema