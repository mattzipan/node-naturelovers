const mongoose = require("mongoose");
const slugify = require("slugify");

// create Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "A tour should have a name!",
      unique: true,
      trim: true,
      maxLength: [40, "A tour name should have up to 40 caracters."],
      minLength: [10, "A tour name should have min 10 caracters."]
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
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be up to 5"]
    },
    price: {
      type: Number,
      required: "A tour must have a price!"
    },
    priceDiscount: {
      type: Number,
      //validator should return true/false
      validator: function(val) {
        return val < this.price;
      },
      message: "Discount must be smaller than the price."
    },
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
    secretTour: {
      type: Boolean,
      default: false
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

//middleware to exclude secret tours
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  //start tracking time
  this.start = Date.now();
  next();
});

//middleware to measure how long a query took
tourSchema.post(/^find/, function(doc, next) {
  console.log(`The query took ${Date.now() - this.start} milliseconds.`);
  next();
});

//middleware to exclude secretTours from aggregation queries
tourSchema.pre("aggregate", function(next) {
  //add another stage to the aggregation before execution
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  next();
});

// use Schema to make the Model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
