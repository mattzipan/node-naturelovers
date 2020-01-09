const dotenv = require("dotenv");
// setting environment variables
dotenv.config({ path: "./config.env" });
console.log(`Environment: ${process.env.NODE_ENV}`);

//this should run after the environment setting from above
const app = require("./app");

//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));
