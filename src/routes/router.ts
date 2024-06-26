import express from "express"
import itemRouter from "./itemRoutes.js"
import {usersRouter} from "./userRoutes.js"
import authRouter from "./authRoutes.js"
import rentRouter from "./rentOrderRoutes.js"
import {authenticateToken} from "../middleware/authenticator.js"
const router =express.Router()

router.use("/v1/auth",authRouter)
router.use("/v1/items",authenticateToken(),itemRouter)
router.use("/v1/users",authenticateToken(),usersRouter)
router.use("/v1/rent",authenticateToken(),rentRouter)


export default router