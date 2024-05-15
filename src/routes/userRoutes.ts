import express, {Request, Response} from "express"
import userSchema from "../validators/userValidator.js"
import UserService from "../services/userService.js"
import validateRequest from "../middleware/requestValidator.js"

const router = express.Router()
const userService = new UserService();


router.post("/",validateRequest(userSchema), async function(req: Request,res: Response){
  try {
    const userBody = req.body
    const response = await userService.create(userBody)
    res.status(201).send(response)

  } catch (error) {
    res.status(400).send(error)
  }
})


router.get("/", async function(req: Request,res: Response){
  try { 
    const users = await userService.getAll()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.put("/:id", async function(req: Request,res: Response){
  try {
    const userId =  req.params.id
    const updatedValues = req.body
    const response = await userService.update(userId,updatedValues)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.delete("/:id", async function(req: Request,res: Response){
  try {
    const userId = req.params.id
    const response = await userService.delete(userId)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})


export default router