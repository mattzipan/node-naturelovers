const Tour = require("../models/tourModel");

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

// API GET all tours
exports.getAllTours = async (req, res) => {
  try {
    //Filtering

    //shallow copy of query to exclude some fields from queries
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    //now delete the fields from the original query
    excludedFields.forEach(item => delete queryObj[item]);

    //replace advanced fields with MongoDB operators
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );
    //gets data from the query string
    // console.log(req.query);
    // the model with .find() returns the same as the collection with the .find() in the terminal
    // use filter directly with MongoDB
    let query = Tour.find(JSON.parse(queryString));

    //same filter with Mongoose methods
    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("diffculty")
    //   .equals("easy");

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-price");
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const tours = await query;

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
