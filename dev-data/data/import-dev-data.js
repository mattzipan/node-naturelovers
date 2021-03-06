// script to automatically import data into DB
const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("../../models/tourModel");

dotenv.config({ path: `${__dirname}/../../config.env` });


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

//read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data imported into DB!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete all data from collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("data deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
