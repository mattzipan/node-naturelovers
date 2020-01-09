const fs = require("fs");
const Tour = require("../models/tourModel");

//reading the file SYNCHRONOUSLY at top level to not block event loop
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//middleware to check if :id is valid
exports.checkId = (req, res, next, val) => {
  //send error if tour doesn't exist

  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Invalid ID"
  //   });
  // }
  next();
};

//middleware to check for name and price in request body
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "tour must include a name and a price"
    });
  }
  next();
};

// API GET all tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    //following JSend formating standard
    status: "success"
    // results: tours.length,
    // requestedAt: req.requestTime,
    // data: {
    //   tours
    // }
  });
};

// API get specific tour by ID

exports.getTour = (req, res) => {
  //convert req.params to numbers
  const id = req.params.id * 1;

  // //get the tour
  // const tour = tours.find(el => el.id === id);

  // res.status(200).json({
  //   //following JSend formating standard
  //   status: "success",
  //   results: tour.length,
  //   data: {
  //     tour
  //   }
  // });
};

//API POST
exports.createTour = (req, res) => {
  //201 status code stands for "created"
  res.status(201).json({
    // status: "success",
    // data: {
    //   tour: newTour
    // }
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
};

//API PATCH

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "updated tour"
    }
  });
};

//API DELETE
exports.deleteTour = (req, res) => {
  //no content response for deleting
  res.status(204).json({
    status: "success",
    data: null
  });
};
