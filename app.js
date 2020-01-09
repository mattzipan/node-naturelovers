const express = require("express");

const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//assign express to app
const app = express();

// MIDDLEWARES
//morgan logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("logging activated..");
}

//middleware to serve static files
app.use(express.static(`${__dirname}/public`));

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

// Routes
app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/users", userRouter);

module.exports = app;
