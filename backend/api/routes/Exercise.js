const express = require('express');

const router = express.Router();
const exercise = require('../../controllers/Exercise.js');

router.get('/exercise', exercise);

module.exports = router;
