const mongoose = require("mongoose");

// create Schema

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "A tour must have a name!",
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: "A tour must have a price!"
  }
});

// use Schema to make the Model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;