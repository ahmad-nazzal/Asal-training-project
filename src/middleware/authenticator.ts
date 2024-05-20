import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

function authenticateToken(){
  return (req: Request/* & {user:JwtPayload | string}*/, res: Response,next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]
    
    try {
      if (!process.env.ACCESS_SECRET_KEY) {
        res.status(401).send("ACCESS_SECRET_KEY environment variable is not defined")
      }
      else {
        const user = jwt.verify(token || "", process.env.ACCESS_SECRET_KEY!)
        req.user = user        
        next()
      }
    } catch (error) {
      res.status(401).send("you are not authorized!")
    }
  }
}

function authorizeRole(rolePremission: Array<string>){
  return (req: Request, res: Response,next: NextFunction) => {
  
    const token = req.headers['authorization']?.split(' ')[1]
    try {
      if (!process.env.ACCESS_SECRET_KEY) {
        res.status(401).send("ACCESS_SECRET_KEY environment variable is not defined")
      }
      const decodedToken = jwt.verify(token || "", process.env.ACCESS_SECRET_KEY!) as JwtPayload
      if(rolePremission.includes(decodedToken.role)){
        next()
      }
      else{
        res.status(403).send("Forbidden")
      }

    } catch (error) {
      res.status(403).send("Forbidden")
    }
  }
}
export {
  authenticateToken,
  authorizeRole
} 
  