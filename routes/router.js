import express from "express"
import itemRouter from "./itemRoutes.js"
import userRouter from "./userRoutes.js"

const router =express.Router()

router.use("/v1/items",itemRouter)
router.use("/v1/users",userRouter)


export default router