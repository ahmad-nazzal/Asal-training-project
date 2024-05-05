import express from "express"
import { addItem,getItems,updateItem,deleteItem } from "../controllers/itemController.js"


const router = express.Router()

router.route("/").post(addItem).get(getItems)

router.get("/", async function(){
  try {
    const items = await getItems()
  } catch (error) {
    
  }


})
router.route("/:_id").put(updateItem).delete(deleteItem)


export default router