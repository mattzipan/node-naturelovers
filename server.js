const mongoose = require("mongoose");
const dotenv = require("dotenv");
// setting environment variables
dotenv.config({ path: `${__dirname}/config.env` });
// console.log(`Environment: ${process.env.NODE_ENV}`);

//configure mongoose
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// handling uncaught exception errors
process.on("uncaughtException", err => {
  console.log("Uncaught Exception")
  console.log(err.name, err.message)
  process.exit(1)
})

//this should run after the environment setting from above
const app = require("./app");

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB connection successful!");
  });

//start the server
const port = process.env.PORT || 3000;
// save to server const to use for rejection handling
const server = app.listen(port, () => {
  console.log(`listening on ${port}...`);
});

process.on("unhandledRejection", err => {
  console.log("Unhandled Rejection!")
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

