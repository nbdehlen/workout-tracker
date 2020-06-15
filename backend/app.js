require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db/index');

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

// app.get('/', (req, res) => {
//   res.send('starting page yolo');
// });

// app.use((req, res, next) => {
//   res.status(404).json({ error: 'not found' });
// });
// app.use((req, res, next, e) => {
//   res.status(500).json({ error: e.message });
// });

db.connect().then(() => {
  app.listen(port, host, () => console.log('App running!'));
});
