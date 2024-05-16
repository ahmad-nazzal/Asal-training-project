import express,{Request,Response} from "express";
import AuthController from "../services/authService.js";
import UserController from "../services/userService.js";
import jwt, { JwtPayload } from "jsonwebtoken"
const route =express.Router()
const authController = new AuthController()

route.post("/login",async (req: Request,res: Response)=>{

  const {username, email,password} = req.body
  try {
    const authenticateResponse = await authController.authenticate(username,email,password)
    if(!authenticateResponse.success){
      res.status(400).send(authenticateResponse.message)
    }
    else {
      const payload = {
        id: authenticateResponse.id,
        role : authenticateResponse.role
      }
      const token = authController.generateAccessToken(payload)  
      const refreshToken = authController.generateRefreshToken(payload)  
      res.status(200).send({
        message: "Login successfully",
        token,
        refreshToken
      })
    }
  
  } catch (error) {
    res.status(500).send({ message: error });
  }

})

route.post("/signup",async (req: Request, res: Response)=>{
  try {
    const userController = new UserController();
    const {message, id} = await userController.create(req.body);
    const payload = {
      id,
      role: req.body.role
    }
    const token = authController.generateAccessToken(payload)  
    const refreshToken = authController.generateRefreshToken(payload)  
    res.status(200).send({
      message,
      token,
      refreshToken
    })
    
  } catch (error) {
    res.status(500).send({ message: error });
  }
})

interface TokenPayload extends JwtPayload {
  id: string,
  role: string
}
route.post("/refresh-token", (req,res)=>{
  const refreshToken = req.headers['authorization']?.split(' ')[1]
  
  try {
    if (!process.env.REFRESH_SECRET_KEY) {
      res.status(401).send("ACCESS_SECRET_KEY environment variable is not defined")
    }
    const decodedToken = jwt.verify(refreshToken || "", process.env.REFRESH_SECRET_KEY!) as TokenPayload
    const payload = {
      id: decodedToken.id,
      role: decodedToken.role
    }
    const newToken = authController.generateAccessToken(payload)
    res.status(200).send({
      message: "Create token successfully",
      newToken
    })

    
  } catch (error) {
    res.status(401).send("you are not authorized!")
  }

})
export default  route