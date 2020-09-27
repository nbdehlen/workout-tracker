const express = require('express');
const {
  getWorkout,
  postWorkout,
  getWorkoutById,
  patchWorkoutById,
  deleteWorkoutById,
  testGetWorkout,
} = require('../../controllers/Workout');
// const exercise = require('../../controllers/Exercise');
const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} = require('../../middlewares/verifySignUp');
const { postSignIn, postSignUp } = require('../../controllers/Auth');

const { verifyToken, isModerator, isAdmin } = require('../../middlewares/authJwt');
const { allAccess, userBoard, moderatorBoard, adminBoard } = require('../../controllers/User');

const router = express.Router();

router.get('/workout', getWorkout);
router.post('/workout', postWorkout);
router.get('/workout/:workoutId', getWorkoutById);
router.patch('/workout/:workoutId', patchWorkoutById);
router.delete('/workout/:workoutId', deleteWorkoutById);
// router.get('/exercise', exercise);
router.post('/auth/signup', [checkDuplicateUsernameOrEmail, checkRolesExisted, postSignUp]);
router.post('/auth/signin', postSignIn);

router.get('/test/all', allAccess);
router.get('/test/user', [verifyToken], userBoard);
router.get('/test/mod', [verifyToken, isModerator], moderatorBoard);
router.get('/test/admin', [verifyToken, isAdmin], adminBoard);
router.get('/user/:userid', [verifyToken, testGetWorkout]);
module.exports = router;
