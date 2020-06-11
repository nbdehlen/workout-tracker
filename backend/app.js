require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const index = require('./api/routes');

const host = process.env.HOST;
const port = process.env.PORT;

/* Config */
app.set('port', port || 5000);
app.use(cors()); // Cross-origin resource sharing
app.use(express.json()); // Parse incoming JSON

/* API */
app.use('/api/v1', index);

app.get('/', (req, res) => {
  res.send('starting page yolo');
});

mongoose.connect(process.env.DB_CON, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('connected to DB!'));
// { useNewUrlParser: true },


app.listen(port, host, () => console.log('App running!'));
