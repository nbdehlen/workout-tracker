const express = require('express');

const router = express.Router();
const exercise = require('../../controllers/Exercise');

router.get('/exercise', exercise);

module.exports = router;
