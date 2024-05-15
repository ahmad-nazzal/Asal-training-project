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
      const token = authController.generateAccessToken({username, email, role : authenticateResponse.role })  
      const refreshToken = authController.generateRefreshToken({username, email, role : authenticateResponse.role  })  
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
    const reponseMessage = userController.create(req.body);
    const payload = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role
    }
    const token = authController.generateAccessToken(payload)  
    const refreshToken = authController.generateRefreshToken(payload)  
    res.status(200).send({
      reponseMessage,
      token,
      refreshToken
    })
    
  } catch (error) {
    res.status(500).send({ message: error });
  }
})

interface TokenPayload extends JwtPayload {
  email?: string,
  username?: string,
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
      email: decodedToken.email,
      username: decodedToken.username,
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