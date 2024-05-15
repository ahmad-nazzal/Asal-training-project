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
      success: true,
      role:user.role
    }
  }

  generateAccessToken(payload: object) {
    if (!process.env.ACCESS_SECRET_KEY) {
      throw new Error("ACCESS_SECRET_KEY environment variable is not defined");
    }
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: "10m"})
  }

  generateRefreshToken(payload: object) {
    if (!process.env.REFRESH_SECRET_KEY) {
      throw new Error("REFRESH_SECRET_KEY environment variable is not defined");
    }
    return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: "1y"})
  }

}


export default AuthController