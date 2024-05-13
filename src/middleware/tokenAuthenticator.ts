import { Request, Response, NextFunction } from "express"
import AuthController from "../controllers/authController.js";
const authController = new AuthController()

const authenticateToken = function(req: Request, res: Response,next: NextFunction){
  
  const token = req.headers['authorization']?.split(' ')[1]

  if(authController.verifyToken(token || "")) {
    next()    
  }
  else {
    res.status(401).send("you are not authorized!")
  }

}

export default authenticateToken