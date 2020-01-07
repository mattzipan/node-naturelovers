const express = require("express");

//assign express to app
const app = express();

//start the server
const port = 3000;
app.listen(port, () => console.log(`listening on ${port}...`));

// routing
app.get("/api/v1/tours", (req, res) => {
  res.
});
