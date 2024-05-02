import express from "express"
import itemRouter from "./itemRoutes.js"

const router =express.Router()

router.use("/v1/items",itemRouter)


export default router