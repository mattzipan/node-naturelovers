const mongoose = require("mongoose");

// create Schema

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "A tour must have a name!",
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: "A tour must have a duration!"
  },
  maxGroupSize: {
    type: Number,
    required: "A tour must have a group size!"
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: "A tour must have a price!"
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: "A tour must have a summary!"
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: "A tour must have an image!"
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});

// use Schema to make the Model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
