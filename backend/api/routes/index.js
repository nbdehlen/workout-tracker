const express = require('express');
const workout = require('../../controllers/Workout');
// const exercise = require('../../controllers/Exercise');

const router = express.Router();

router.get('/workout', workout.getWorkout);
router.post('/workout', workout.postWorkout);
router.get('/workout/:workoutId', workout.getWorkoutById);
router.patch('/workout/:workoutId', workout.patchWorkoutById);
router.delete('/workout/:workoutId', workout.deleteWorkoutById);
// router.get('/exercise', exercise);

module.exports = router;
