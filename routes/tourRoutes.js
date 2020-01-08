const express = require("express");
const fs = require("fs");

//reading the file SYNCHRONOUSLY at top level to not block event loop
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// API GET all tours
const getAllTours = (req, res) => {
  res.status(200).json({
    //following JSend formating standard
    status: "success",
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours
    }
  });
};

// API get specific tour by ID

const getTour = (req, res) => {
  //convert req.params to numbers
  const id = req.params.id * 1;

  //get the tour
  const tour = tours.find(el => el.id === id);

  //send error if tour doesn't exist
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    //following JSend formating standard
    status: "success",
    results: tour.length,
    data: {
      tour
    }
  });
};

//API POST
const createTour = (req, res) => {
  // console.log(req.body);

  //temporary while working with local JSON file: creating an id for each document
  const newId = tours[tours.length - 1].id + 1;
  //merge req.body object with new id
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      //201 status code stands for "created"
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour
        }
      });
    }
  );
};

//API PATCH

const updateTour = (req, res) => {
  //send error if tour doesn't exist

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "updated tour"
    }
  });
};

//API DELETE
const deleteTour = (req, res) => {
  //send error if tour doesn't exist

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  //no content response for deleting
  res.status(204).json({
    status: "success",
    data: null
  });
};

//shorter syntax for routes
const router = express.Router();

router
  .route("/")
  .get(getAllTours)
  .post(createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
