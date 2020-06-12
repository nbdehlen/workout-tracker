const express = require('express');

const router = express.Router();
const workout = require('../../controllers/Workout');

router.get('/workout', workout.getWorkout(req, res));
router.post('/workout', workout.postWorkout(req, res));
router.get('/workout/:workoutId', workout.getWorkoutById(req, res));
router.patch('/workout/:workoutId', workout.patchWorkoutById(req, res));
router.delete('/workout/:workoutId', workout.deleteWorkoutById(req, res));

module.exports = router;
