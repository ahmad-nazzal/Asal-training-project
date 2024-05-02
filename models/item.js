import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true 
  },
  comment: {
    type: String,
    required: true
  }

}, {timestamps: true})

const rentSchema = new Schema({
  user_id: {
    type: String,
    // required: true,
  },
  rentedAt: {
    type: Date,
    // required: true
  },
  returnDate: {
    type: Date
  },
  reviews: [reviewSchema]
}, { timestamps : true}) 

const saleSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
},{timestamps : true})

const itemSchema = new Schema({
  name: {
    type: String,
    // required : true
  },
  owner_id:{
    type: String,
    // required: true
  },
  description:{
    type: String,
    // required: true
  },
  available:{
    type: Boolean,
    // required: true
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
    // required: true
  },
  rent: [rentSchema],
  sale: [saleSchema]

},{ timestamps : true });

const Item = mongoose.model("items",itemSchema)

export default Item

