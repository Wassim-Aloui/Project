
var express = require("express");
const cors = require('cors');
var app = express();
var db = require("./db");
var user = require("./Routes/UserRoute");



// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/user",user);

// Create an HTTP server using Express
var server = require("http").createServer(app).listen(3001);