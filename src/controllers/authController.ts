import {User} from "../models/user.js"
import jwt from 'jsonwebtoken'

class AuthController {

  async authenticate(username: string, email: string, password: string) {
    const user =  await User.findOne({
      $or:[
        {username},
        {email}
      ]
    })
    if(!user){
      return {
        success: false,
        message:"User is not found"
      }
    }

    const isMatch = await user.isValidPassword(password)
    if(!isMatch){
      return {
        success: false,
        message:"password is not correct"
      }
    }

    return {
      success: true
    }
  }

  generateToken(payload: object, key: string, expiration: object) {
    if (key) {
      throw new Error("KEY environment variable is not defined");
    }
    return jwt.sign(payload, key, expiration)
  }

  verifyToken(token: string) {
    try {
      if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY environment variable is not defined");
      }
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
      return decodedToken
    } catch (error) {
      return false
    }
  }
}


export default AuthController