const express = require('express');
const {
  getWorkout,
  postWorkout,
  getWorkoutById,
  patchWorkoutById,
  deleteWorkoutById,
  getUserWorkouts,
  patchUserWorkoutById,
  deleteUserWorkoutById,
  postUserWorkout,
} = require('../../controllers/Workout');
// const exercise = require('../../controllers/Exercise');
const {
  emailExists,
  usernameExists,
  rolesExists,
} = require('../../middlewares/signUp');
const { postLogin, postSignUp } = require('../../controllers/Auth');

const verifyToken = require('../../middlewares/jwtToken');
const { admin, moderator } = require('../../middlewares/roles');
const {
  allAccess, userBoard, moderatorBoard, adminBoard,
} = require('../../controllers/User');

const router = express.Router();

router.get('/workout', getWorkout);
router.post('/workout', postWorkout);
router.get('/workout/:workoutId', getWorkoutById);
router.patch('/workout/:workoutId', patchWorkoutById);
router.delete('/workout/:workoutId', deleteWorkoutById);
// router.get('/exercise', exercise);
router.post('/auth/signup', [emailExists, usernameExists, rolesExists, postSignUp]);
router.post('/auth/login', postLogin);

router.get('/test/all', allAccess);
router.get('/test/user', [verifyToken], userBoard);
router.get('/test/mod', [verifyToken, moderator], moderatorBoard);
router.get('/test/admin', [verifyToken, admin], adminBoard);
router.get('/user/workouts', [verifyToken, getUserWorkouts]);
router.patch('/user/workout/:workoutId', [verifyToken, patchUserWorkoutById]);
router.delete('/user/workout/:workoutId', [verifyToken, deleteUserWorkoutById]);
router.post('/user/workout', [verifyToken, postUserWorkout]);
module.exports = router;
