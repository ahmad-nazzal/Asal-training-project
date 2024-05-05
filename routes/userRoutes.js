import express from "express"
import {addUser,getUsers,updateUser,deleteUser} from "../controllers/userController.js"

const router = express.Router()

router.post("/", async function(req,res){
  try {
    const userBody = req.body
    const response = await addUser(userBody)
    res.status(200).send(response)

  } catch (error) {
    res.status(400).send(error)
  }


})

router.get("/", async function(req,res){
  try {
    const users = await getUsers()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put("/:id", async function(req,res){
  try {
    const userId =  req.params.id
    const updatedValues = req.body
    const response = await updateUser(userId,updatedValues)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }


})

router.delete("/:id", async function(req,res){
  try {
    const userId = req.params.id
    console.log(userId);
    const response = await deleteUser(userId)
    console.log(response+"pqpq");
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})


export default router