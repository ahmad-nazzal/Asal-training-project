import express, {Request, Response} from "express";
import RentService from "../services/rentOrderService.js";

const rentService = new RentService()
const router = express.Router()

router.post("/item/:itemId", async (req: Request, res: Response) => {
  const {id} = req.user
  const {itemId} = req.params
  try {
    const response = await rentService.rentItem(id, itemId);
    res.status(201).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/items", async (req: Request, res: Response) => {
  //?
})

//extend the rented period
// router.put("/:rentId", async (req: Request, res: Response) => {
//   const {rentId} = req.params
//   try {
//     const response = await rentService.extend(id, itemId);
//     res.status(201).send(response)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

export default router