const express = require("express");
const appError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorController")
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

// handling unknown routes
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl}`
  // })

  // const err = new Error(`Cant find ${req.originalUrl}`)
  // err.statusCode = 404
  // err.status = "fail"

  // next handles ANY argument as an error and passes it to the global error handler in app.js, jumping over other middlewares
  next(new appError(`Cant find ${req.originalUrl}`, 404))
})

// express interprates every middleware with 4 arguments as an error handler
app.use(globalErrorHandler)

module.exports = app;
