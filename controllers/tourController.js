const Tour = require("../models/tourModel");
const APIfeatures = require("../utils/apiFeatures");

//reading the file SYNCHRONOUSLY at top level to not block event loop
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//middleware to check if :id is valid
// exports.checkId = (req, res, next, val) => {
//send error if tour doesn't exist

// if (req.params.id * 1 > tours.length) {
//   return res.status(404).json({
//     status: "fail",
//     message: "Invalid ID"
//   });
// }
//   next();
// };

// middleware for top 5 tours
exports.top5Tours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  next();
};

// API GET all tours
exports.getAllTours = async (req, res) => {
  try {
    //same filter with Mongoose methods
    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");

    const features = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      //following JSend formating standard
      status: "success",
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

// API get specific tour by ID

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      //following JSend formating standard
      status: "success",
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

//API POST
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    //201 status code stands for "created"
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    });
    // // console.log(req.body);

    // //temporary while working with local JSON file: creating an id for each document
    // const newId = tours[tours.length - 1].id + 1;
    // //merge req.body object with new id
    // const newTour = Object.assign({ id: newId }, req.body);

    // tours.push(newTour);
    // fs.writeFile(
    //   `${__dirname}/../dev-data/data/tours-simple.json`,
    //   JSON.stringify(tours),
    //   err => {
    //     //201 status code stands for "created"
    //     res.status(201).json({
    //       status: "success",
    //       data: {
    //         tour: newTour
    //       }
    //     });
    //   }
    // );
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent"
    });
  }
};

//API PATCH

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: "success",
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

//API DELETE
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    //no content response for deleting
    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

//aggregation data
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        //take all tours with an avgRating greater/equal to 4.5...
        $match: {
          ratingsAverage: { $gte: 4.0 }
        }
      },
      //don't make sub groups of the selection and return avg rating, price and min/max price for the group
      {
        $group: {
          // optionally add the name of the field with $ for subgroups, e.g. _id:"$difficulty" or _id:{$toUpper: "$difficulty"}
          _id: "$difficulty",
          //add one to numTours for each tour
          numTours: { $sum: 1 },
          // sum ratingsQuantity
          numRatings: { $sum: "ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" }
        }
      },
      {
        // sort by avgPrice, ascending (1) / descending (-1)
        $sort: { avgPrice: 1 }
      },
      // exclude subgroup easy
      { $match: { _id: { $ne: "easy" } } }
    ]);

    //give the API response
    res.status(200).json({
      status: "success",
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      { $unwind: "$startDates" },
      {
        $match: {
          // only select tours during the given year
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$startDates" },

          numTourStarts: { $sum: 1 },
          // create an array of the tour names
          tours: { $push: "$name" }
        }
      },
      {
        $addFields: { month: "$_id" }
      },
      {
        // exclude the id field from the response
        $project: {
          _id: 0
        }
      },
      {
        // sort by number of tour starts
        $sort: { numTourStarts: -1 }
      },
      {
        // limit the response to 6 results
        $limit: 6
      }
    ]);

    //give the API response
    res.status(200).json({
      status: "success",
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
