import express from "express"
import {addUser,getUsers,updateUser,deleteUser} from "../controllers/userController.js"

const router = express.Router()

router.route("/").post(addUser).get(getUsers)
router.route("/:_id").put(updateUser).delete(deleteUser)


export default router