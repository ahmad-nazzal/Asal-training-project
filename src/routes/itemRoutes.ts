import express,{Request,Response} from "express"
import ItemController from "../controllers/itemController.js"
import itemSchema from "../validators/itemValidator.js";
import validateRequest from "../middleware/requestValidator.js";

const router = express.Router()
const itemController = new ItemController();


router.post("/",validateRequest(itemSchema), async function(req: Request,res: Response){
  try {
    const itemBody = req.body
    const response = await itemController.create(itemBody)
    res.status(201).send(response)

  } catch (error) {
    res.status(400).send(error)
  }
})


router.get("/", async function(req: Request,res: Response){
  try {
    const items = await itemController.getAll()
    res.status(200).send(items)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.put("/:id", async function(req: Request,res: Response){
  try {
    const itemId =  req.params.id
    const updatedValues = req.body
    const response = await itemController.update(itemId,updatedValues)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.delete("/:id", async function(req: Request,res: Response){
  try {
    const itemId = req.params.id
    const response = await itemController.delete(itemId)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})


export default router