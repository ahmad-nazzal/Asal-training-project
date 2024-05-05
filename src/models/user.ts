import mongoose from "mongoose";
import bcrypt from "bcrypt"
const Schema = mongoose.Schema

const locationSchema = new Schema({
  street: String,
  city: {
    type: String,
    required: true
  },
  country: String
}, {_id: false})

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["user" , "admin"]
  },
  address: {
    type: locationSchema,
    required: true
  }
},{ timestamps:true})

userSchema.pre('save', async function(next){
  try {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(this.password, salt)
    this.password= passwordHash
    next()
  } catch (error: any) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function(password: string) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error: any) {
    throw new Error(error)
  }
}

const User = mongoose.model("users",userSchema)
export default User 