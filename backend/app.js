require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
const db = require('./db/index');

const app = express();
const index = require('./api/routes');

const host = process.env.HOST;
const port = process.env.PORT;

/* Config */
app.set('port', port || 5000);
app.use(cors()); // Cross-origin resource sharing
app.use(express.json()); // Parse incoming JSON
app.use(morgan('dev')); // logger

/* API */
app.use('/api/v1', index);

db.connect().then(() => {
  app.listen(port, host, () => console.log('App running!'));
});

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});


module.exports = app;
