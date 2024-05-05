import express from "express"
import { addItem,getItems,updateItem,deleteItem } from "../controllers/itemController.js"


const router = express.Router()

router.post("/", async function(req,res){
  try {
    const itemBody = req.body
    const response = await addItem(itemBody)
    res.status(200).send(response)

  } catch (error) {
    res.status(400).send(error)
  }


})

router.get("/", async function(req,res){
  try {
    const items = await getItems()
    res.status(200).send(items)
  } catch (error) {
    res.status(400).send(error)
  }


})

router.put("/:id", async function(req,res){
  try {
    const itemId =  req.params.id
    const updatedValues = req.body
    const response = await updateItem(itemId,updatedValues)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }


})

router.delete("/:id", async function(req,res){
  try {
    const itemId = req.params.id
    const response = await deleteItem(itemId)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }


})


export default router