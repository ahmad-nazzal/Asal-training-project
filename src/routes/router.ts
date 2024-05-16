import express from "express"
import itemRouter from "./itemRoutes.js"
import {usersRouter,userRouter} from "./userRoutes.js"
import authRouter from "./authRoutes.js"
import {authenticateToken} from "../middleware/authenticator.js"
const router =express.Router()

router.use("/v1/auth",authRouter)
router.use("/v1/items",authenticateToken(),itemRouter)
router.use("/v1/users",authenticateToken(),usersRouter)
router.use("/v1/user",authenticateToken(),userRouter)


export default router