import express, {Request, Response} from "express"
import userSchema from "../validators/userValidator.js"
import UserService from "../services/userService.js"
import validateRequest from "../middleware/requestValidator.js"
import { authorizeRole } from "../middleware/authenticator.js"
import ItemService from "../services/itemService.js"

const usersRouter = express.Router()
const userRouter = express.Router()
const userService = new UserService();
const itemService = new ItemService();

usersRouter.post("/",[validateRequest(userSchema), authorizeRole(["admin"])], async function(req: Request,res: Response){
  try {
    const userBody = req.body
    const response = await userService.create(userBody)
    res.status(201).send(response)

  } catch (error) {
    res.status(400).send(error)
  }
})


usersRouter.get("/", authorizeRole(["admin"]), async function(req: Request,res: Response){
  try { 
    const users = await userService.getAll()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }
})


usersRouter.put("/:id", authorizeRole(["user"]), async function(req: Request,res: Response){
  try {
    const userId =  req.params.id
    const updatedValues = req.body
    const response = await userService.update(userId,updatedValues)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})


usersRouter.delete("/:id", authorizeRole(["admin"]), async function(req: Request,res: Response) {
  try {
    const userId = req.params.id
    const response = await userService.delete(userId)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})

userRouter.get("/items", authorizeRole(["user","admin"]), async function(req: Request, res: Response) {
  const {email, username}= req.user
    try {
    const items = await itemService.getItemsForUser(email,username)
    res.status(200).send(items)

  } catch (error) {
    res.status(400).send(error)    
  }
})


export{
  usersRouter,
  userRouter
} 
  