'use strict';

// ----- dependencies
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const auth = require('./routes/auth');
const user = require('./routes/user');
const note = require('./routes/note');

// ---- instantiations

const app = express();

// ---- database

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// Middlewares

app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// --- routes

app.use('/auth', auth);
app.use('/user', user);
// not sure.. this is a route of where it's stored on the backend
app.use('/note', note);

// --- error handling

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({code: 'not found'});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({code: 'unexpected'});
  }
});

module.exports = app;
