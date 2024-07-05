const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());   // this middleware is used to parse incoming request bodies in express.

const port = process.env.PORT || 7000;


// middleware is used to serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root URL ("/") 
app.get("/", function (req, res) {
  res.render("index.html");
});

// catch-all route to serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start and listen on port given
app.listen(port, function () {
  console.log("Application is running on port: ", port);
});