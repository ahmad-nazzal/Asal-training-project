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

}, {
  timestamps: true,
  _id:false
})

const rentSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  item_id: {
    type: String,
    required: true
  },
  rentedAt: {
    type: Date,
    required: true
  },
  return_date: {
    type: Date
  },
  reviews: [reviewSchema]
}, {
  timestamps : true,
})

const Rent = mongoose.model("rent", rentSchema)

export default Rent