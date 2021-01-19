const express = require("express")
const workout = require("../../controllers/Workout")
const signUp = require("../../middlewares/signUp")
const auth = require("../../controllers/Auth")
const verifyToken = require("../../middlewares/jwtToken")
const adminRole = require("../../middlewares/roles")
const adminAction = require("../../controllers/Admin")

const router = express.Router()

router.post("/auth/signup", [
  signUp.emailExists,
  signUp.usernameExists,
  auth.postSignUp,
])
router.post("/auth/login", auth.postLogin)
router.get("/user/workouts", [verifyToken, workout.getUserWorkouts])
router.patch("/user/workout/:workoutId", [
  verifyToken,
  workout.patchUserWorkoutById,
])
router.delete("/user/workout/:workoutId", [
  verifyToken,
  workout.deleteUserWorkoutById,
])
router.post("/user/workout", [verifyToken, workout.postUserWorkout])
router.post(
  "/admin",
  [verifyToken, adminRole.admin, signUp.emailExists, signUp.usernameExists],
  adminAction.createUser
)
router.delete(
  "/admin/:userId",
  [verifyToken, adminRole.admin],
  adminAction.deleteUser
)
router.get("/admin", [verifyToken, adminRole.admin], adminAction.getUsers)
router.patch(
  "/admin/:userId",
  [verifyToken, adminRole.admin],
  adminAction.editUser
)

module.exports = router
