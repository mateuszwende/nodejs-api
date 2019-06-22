require('dotenv').config();

const debug = require('debug')('app-index');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const db = require('./db');
const apiRoutes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const passportConfig = require('./middlewares/auth');

const app = express();

// Connect to database
db.connect()
  .then(() => debug('Database connected successfully!'))
  .catch(err => debug(err));

// Configure security
app.use(helmet());
app.use(cors());

// Allows parsing the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure passport
passportConfig.init();

// Mount API routes
app.use('/api', apiRoutes);

// Handle any errors
app.use(errorHandler.invalidRoute);
app.use(errorHandler.validationErrors);
app.use(errorHandler.displayErrors);

module.exports = app;
