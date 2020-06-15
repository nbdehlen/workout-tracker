const express = require('express');
const {
  getWorkout, postWorkout, getWorkoutById, patchWorkoutById, deleteWorkoutById,
} = require('../../controllers/Workout');
// const exercise = require('../../controllers/Exercise');

const router = express.Router();

router.get('/workout', getWorkout);
router.post('/workout', postWorkout);
router.get('/workout/:workoutId', getWorkoutById);
router.patch('/workout/:workoutId', patchWorkoutById);
router.delete('/workout/:workoutId', deleteWorkoutById);
// router.get('/exercise', exercise);

module.exports = router;
