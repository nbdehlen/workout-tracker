const express = require('express');
const { verifyToken } = require('../../middlewares/authJwt');

const router = express.Router();
const {
  getWorkout,
  postWorkout,
  getWorkoutById,
  deleteWorkoutById,
  patchWorkoutById,
  testGetWorkout,
} = require('../../controllers/Workout');

router.get('/workout', getWorkout);
router.post('/workout', postWorkout);
router.get('/workout/:workoutId', getWorkoutById);
router.patch('/workout/:workoutId', patchWorkoutById);
router.delete('/workout/:workoutId', deleteWorkoutById);
router.get('/user/:userid', [verifyToken, testGetWorkout]);
module.exports = router;
