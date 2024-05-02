import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes/router.js"

dotenv.config()
const app = express();
app.use(express.json())
app.get("/test",(req,res)=>{
  console.log(req.url);
  res.send("test is done")
})

mongoose.connect(process.env.DB_URI)
.then(()=>{
  console.log("connect sucessfully");
  app.listen(process.env.PORT)
})
.catch((error=>{
  console.error(error);
}))

app.use(router)


