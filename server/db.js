//Database configuration 

"use strict";
const mongoose = require("mongoose");
// Load environment variables from a .env file
require("dotenv").config();
mongoose.set("strictQuery", true);

// Connect to the MongoDB database using the URI from the environment variables
mongoose
  .connect(process.env.DB_URI, {
  })
  .then(() => console.log("Connected"))
  .catch((err) => console.error("Connection error:", err));

module.exports = mongoose;
