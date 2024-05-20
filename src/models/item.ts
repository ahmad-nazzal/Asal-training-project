import mongoose from "mongoose"

const Schema = mongoose.Schema

const saleSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
},{
  timestamps : true,
  _id:false
})

const itemSchema = new Schema({
  name: {
    type: String,
    required : true
  },
  owner_id:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  available:{
    type: Boolean,
    required: true
  },
  type:{
    type: String,
    required: true,
    enum:["sale","rent","sale and rent"]
  },
  price_per_day:{
    type: Number,
  },
  price:{
    type: Number,
  },
  category_id:{
    type: String,
    required: true
  },
  sale: saleSchema

},{ timestamps : true });

const Item = mongoose.model("items",itemSchema)

export default Item

