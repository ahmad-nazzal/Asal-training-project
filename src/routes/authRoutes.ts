import express,{Request,Response} from "express";
import AuthController from "../controllers/authController.js";
import UserController from "../controllers/userController.js";

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
      const token = authController.generateToken({username, email }, process.env.SECRET_KEY!, {expiresIn:"7d"})  
      res.status(200).send({
        message: "Login successfully",
        token
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
      email: req.body.email
    }
    const token = authController.generateToken(payload, process.env.SECRET_KEY!, {expiresIn:"7d"})  
    res.status(200).send({
      reponseMessage,
      token
    })
    
  } catch (error) {
    res.status(500).send({ message: error });
  }
})

route.post("/refresh-token", (req,res)=>{
  const {refreshToken} = req.body
  if(!refreshToken){
    return res.status(400).send("Refresh token not found")
  }

})
export default  route