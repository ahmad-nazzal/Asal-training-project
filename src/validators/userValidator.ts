import Joi from "joi"
const userSchema = Joi.object().keys({
  email: Joi.string().email()
})

export {
  userSchema
}