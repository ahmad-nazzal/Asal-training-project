import express, {Request, Response} from "express"
import validateRequest from "../middleware/validator.js"
import userSchema from "../validators/userValidator.js"
import UserController from "../controllers/userController.js"

const router = express.Router()
const userController = new UserController();


router.post("/",validateRequest(userSchema), async function(req: Request,res: Response){
  try {
    const userBody = req.body
    const response = await userController.create(userBody)
    res.status(201).send(response)

  } catch (error) {
    res.status(400).send(error)
  }
})


router.get("/", async function(req: Request,res: Response){
  try {
    const users = await userController.getAll()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.put("/:id", async function(req: Request,res: Response){
  try {
    const userId =  req.params.id
    const updatedValues = req.body
    const response = await userController.update(userId,updatedValues)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.delete("/:id", async function(req: Request,res: Response){
  try {
    const userId = req.params.id
    const response = await userController.delete(userId)
    res.status(200).send(response)
  } catch (error) {
    console.log("fff");
    res.status(400).send(error)
  }
})


export default router