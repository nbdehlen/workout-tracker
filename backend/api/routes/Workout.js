const express = require('express');
const verifyToken = require('../../middlewares/jwtToken');

const router = express.Router();
const {
  getWorkout,
  postWorkout,
  getWorkoutById,
  deleteWorkoutById,
  patchWorkoutById,
  getUserWorkouts,
  patchUserWorkoutById,
  deleteUserWorkoutById,
  postUserWorkout,
} = require('../../controllers/Workout');

router.get('/workout', getWorkout);
router.post('/workout', postWorkout);
router.get('/workout/:workoutId', getWorkoutById);
router.patch('/workout/:workoutId', patchWorkoutById);
router.delete('/workout/:workoutId', deleteWorkoutById);
router.get('/user/workouts', [verifyToken, getUserWorkouts]);
router.patch('/user/workout/:workoutId', [verifyToken, patchUserWorkoutById]);
router.delete('/user/workout/:workoutId', [verifyToken, deleteUserWorkoutById]);
router.post('/user/workout', [verifyToken, postUserWorkout]);
module.exports = router;
