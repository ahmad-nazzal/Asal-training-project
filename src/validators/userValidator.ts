import Joi from "joi"

const locationSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string().required(),
  country: Joi.string()
});

const userSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  phone_number: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required().valid('user', 'admin'),
  address: locationSchema.required()
})

export default userSchema