const express = require("express");
const fs = require("fs");

//assign express to app
const app = express();

//add the req body to the POST
app.use(express.json());

//reading the file SYNCHRONOUSLY at top level to not block event loop
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//start the server
const port = 3000;
app.listen(port, () => console.log(`listening on ${port}...`));

// API GET all tours
const getAllTours = (req, res) => {
  res.status(200).json({
    //following JSend formating standard
    status: "success",
    results: tours.length,
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
    `${__dirname}/dev-data/data/tours-simple.json`,
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

// Routes
// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

//shorter syntax for routes
app
  .route("/api/v1/tours")
  .get(getAllTours)
  .post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
