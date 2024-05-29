require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const dbConnectionString = process.env.STRING || "";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// connection to database
mongoose.connect(dbConnectionString, { useNewUrlParser: true });
mongoose.connection.on("connected", function () {
    console.log("My App is connected to Database!!");
  })

// port set to 8000
const port = process.env.PORT;

app.listen(port, function () {
  console.log("My App is running on this port: ", port);
});


