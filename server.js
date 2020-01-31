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
app.listen(port, () => {
  console.log(`listening on ${port}...`);
});
