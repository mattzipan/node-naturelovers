const express = require("express");

const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//assign express to app
const app = express();

// MIDDLEWARES
//morgan logging middleware
app.use(morgan("dev"));

//middleware to add the req body to the POST
app.use(express.json());

//test middleware
app.use((req, res, next) => {
  // console.log("hello from the middleware 🤘");
  next();
});

//another test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//start the server
const port = 3000;
app.listen(port, () => console.log(`listening on ${port}...`));

// Routes
// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/users", userRouter);
