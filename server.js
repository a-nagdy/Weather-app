// setup empty object to be end point for all routes

projectData = {};

// require express to run server / routes

const express = require("express");

// create express app

const app = express();

// dependencies
const bodyParser = require("body-parser");

//middleware
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// cors for cross origin

const cors = require("cors");
app.use(cors());

// set static folder
app.use(express.static("website"));

// set port
const port = 8080;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// get the route that returns the data object

app.get("/all", (request, response) => {
  response.send(projectData);
});

// post route

app.post("/addWeatherData", (request, response) => {
  projectData.temperature = request.body.temperature;
  projectData.date = request.body.date;
  projectData.user_response = request.body.user_response;
  response.send(projectData);
  console.log(projectData);
  response.end();
});
