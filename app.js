const express = require("express");

//assign express to app
const app = express();

//start the server
const port = 3000;
app.listen(port, () => console.log(`listening on ${port}...`));

// routing
app.get("/", (req, res) => {
  res.status(200).send("hello from the server");
});
