const express = require("express");
const mongoose = require("mongoose");
require("./connection/connections");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

//! Middlewares
app.use(express.json()); //pass incoming json data from the user
//!Routes
app.use("/", router);
//!error handler
app.use(errorHandler);
//! Start the server
const PORT = 8000;
app.listen(PORT, console.log(`Server is up and running`));
