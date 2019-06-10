"use strict";

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const logger = require("morgan");

const cors = require("cors");
const db = require("./db");
const apiRoutes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
// const i18n = require('i18n');
// const i18nConfigure = require('../config/lang');
// i18nConfigure();

const app = express();

// Connect to mongo.
db.connect().catch(err => {
  throw err;
});

app.use(helmet());
app.use(cors());

// Allows parsing the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mount API routes
app.use("/api", apiRoutes);

// server.use(i18n.init);
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

// Handle any errors
app.use(errorHandler.invalidRoute);
app.use(errorHandler.validationErrors);
app.use(errorHandler.displayErrors);

module.exports = app;
