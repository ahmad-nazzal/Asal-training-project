import express,{Request,Response} from "express"
import ItemService from "../services/itemService.js"
import itemSchema from "../validators/itemValidator.js";
import validateRequest from "../middleware/requestValidator.js";
import { authorizeRole } from "../middleware/authenticator.js";

const router = express.Router()
const itemService = new ItemService();


router.post("/",authorizeRole(["user","admin"]),validateRequest(itemSchema), async function(req: Request,res: Response){
  try {
    const itemBody = req.body
    const response = await itemService.create(itemBody)
    res.status(201).send(response)

  } catch (error) {
    res.status(400).send(error)
  }
})


router.get("/",authorizeRole(["user","admin"]), async function(req: Request,res: Response){
  try {
    const items = await itemService.getAll()
    res.status(200).send(items)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.put("/:id",authorizeRole(["admin"]), async function(req: Request,res: Response){
  try {
    const itemId =  req.params.id
    const updatedValues = req.body
    const response = await itemService.update(itemId,updatedValues)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.delete("/:id",authorizeRole(["admin"]), async function(req: Request,res: Response){
  try {
    const itemId = req.params.id
    const response = await itemService.delete(itemId)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})


export default router