const mongoose = require("mongoose");
const slugify = require("slugify");

// create Schema

const tourSchema = new mongoose.Schema(
  {
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
    difficulty: {
      type: String,
      required: "A tour must have a difficulty",
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult"
      }
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
    startDates: [Date],
    slug: String
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//add virtual fields. This will be calculated on every get request
// virtual properties are not in the api response by default, it has to be specifically defined
tourSchema.virtual("durationWeeks").get(function() {
  return this.duration / 7;
});

//mongoose middleware to create slug on each document before "save & "create"
tourSchema.pre("save", function(next) {
  //require slugify package
  this.slug = slugify(this.name, { lower: true });
  next();
});

//middleware hook to run after saving
tourSchema.post("save", function(doc, next) {
  console.log("just saved the tour! This is it:..");
  console.log(doc);
  next();
});

// use Schema to make the Model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
