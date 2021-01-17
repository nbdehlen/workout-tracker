const express = require("express")
const {
  getUserWorkouts,
  patchUserWorkoutById,
  deleteUserWorkoutById,
  postUserWorkout,
} = require("../../controllers/Workout")
const { emailExists, usernameExists } = require("../../middlewares/signUp")
const { postLogin, postSignUp } = require("../../controllers/Auth")

const verifyToken = require("../../middlewares/jwtToken")
const { admin } = require("../../middlewares/roles")

const {
  createUser,
  deleteUser,
  getUsers,
  editUser,
} = require("../../controllers/Admin")

const router = express.Router()

/**
 * @swagger
 * definitions:
 *  Signup:
 *    type: object
 *    properties:
 *      username:
 *            type: string
 *            required: true
 *            example: 'King_Joe'
 *      email:
 *            required: true
 *            type: string
 *            example: 'king_joe@kingjoe.com'
 *      password:
 *            required: true
 *            type: string
 *            example: 'super difficult password'
 *  Login:
 *    type: object
 *    properties:
 *      username:
 *            type: string
 *            required: true
 *            example: 'King_Joe'
 *      password:
 *            required: true
 *            type: string
 *            example: 'super difficult password'
 *  Workout:
 *    type: object
 *    properties:
 *      "type":
 *        type: string
 *        maxLength: 50
 *        example: gym
 *      start:
 *        type: Date
 *        maxLength: 100
 *        minLength: 1
 *        example: "2020-03-25T12:00:00Z"
 *      grade:
 *        type: integer
 *        maximum: 10
 *        minimum: 1
 *        example: 7
 *
 *        exercises:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             exerciseType:
 *               type: string
 *               example: strength
 *             name:
 *               type: string
 *               example: squat
 *             compound:
 *               type: boolean
 *               example: true
 *             mainMuscle:
 *               type: string
 *               example: "quads"
 *             secondaryMuscles:
 *               type: array
 *               items:
 *                 type: string
 *             tool: string
 *             unilateral:
 *               type: boolean
 *
 *             sets:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   weight:
 *                     type: number
 *                     example: 48
 *                   reps:
 *                     type: number
 *                     example: 12
 *                   rest:
 *                     type: string
 *                     example: "90"
 *                   time:
 *                     type: string
 *                     example: "45"
 *
 *             duration:
 *               type: string
 *             calories:
 *               type: number
 *
 *      end:
 *         type: Date
 *         maxLength: 100
 *         example: 2020-03-25T14:00:00Z
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *  post:
 *    summary: Create user
 *    description: Use to register an account
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Signup'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Email or username already in use
 *      '500':
 *        description: Server error
 */
router.post("/auth/signup", [emailExists, usernameExists, postSignUp])

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: Login user
 *    description: Use to login account
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Login'
 *    responses:
 *      '200':
 *        description: A successful response return user object with x-access-token
 *      '401':
 *        description: Invalid password
 *      '404':
 *        description: User not found
 */
router.post("/auth/login", postLogin)

/**
 * @swagger
 * /api/v1/user/workouts:
 *  get:
 *    summary: Get all user workouts
 *    description: Use to request all user workouts
 *    parameters:
 *    - name: x-access-token
 *      description: jwt-token
 *      in: header
 *      required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Not authorized
 *      '403':
 *        description: No token provided
 *      '404':
 *        description: UserID does not exist
 *
 */
router.get("/user/workouts", [verifyToken, getUserWorkouts])

/**
 * @swagger
 * /api/v1/user/workout/{workoutId}:
 *   patch:
 *     summary: Edit user workout
 *     description: Use to edit a user workout
 *     parameters:
 *     - name: workoutId
 *       in: path
 *       required: true
 *     - name: x-access-token
 *       description: jwt-token
 *       in: header
 *       required: true
 *     - name: userId
 *       in: header
 *       required: true
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/definitions/Workout'
 *
 *     responses:
 *       "200":
 *         description: A successful response
 *       "400":
 *         description: Parameters or workoutId is invalid
 *       "401":
 *         description: Not authorized
 *       "403":
 *         description: No token provided
 *       "404":
 *         description: WorkoutId does not exist or UserID does not exist
 *       "422":
 *         description: Body is empty
 *       "500":
 *         description: Server error
 */
router.patch("/user/workout/:workoutId", [verifyToken, patchUserWorkoutById])

/**
 * @swagger
 * /api/v1/user/workout/{workoutId}:
 *  delete:
 *    summary: Delete user workout
 *    description: Use to delete a user workout
 *    parameters:
 *    - name: x-access-token
 *      description: jwt-token
 *      in: header
 *      required: true
 *    - name: workoutId
 *      in: path
 *      required: true
 *      type: string
 *    - name: userId
 *      in: header
 *      required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: WorkoutId is invalid
 *      '401':
 *        description: Not authorized
 *      '403':
 *        description: No token provided
 *      '404':
 *        description: WorkoutId does not exist
 *      '500':
 *        description: Server error
 */
router.delete("/user/workout/:workoutId", [verifyToken, deleteUserWorkoutById])

/**
 * @swagger
 * /api/v1/user/workout/:
 *  post:
 *    summary: Create user workout
 *    description: Use to post a workout
 *    parameters:
 *    - name: x-access-token
 *      description: jwt-token
 *      in: header
 *      required: true
 *    - name: userId
 *      in: header
 *      required: true
 *      type: string
 *    requestBody:
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/definitions/Workout'
 *
 *    responses:
 *      '201':
 *        description: A successful response
 *      '400':
 *        description: WorkoutId is invalid
 *      '401':
 *        description: Not authorized
 *      '403':
 *        description: No token provided
 *      '404':
 *        description: WorkoutId does not exist
 *      '422':
 *        description: Body is empty
 *      '500':
 *        description: Server error
 *      '504':
 *        description: User not logged in
 */
router.post("/user/workout", [verifyToken, postUserWorkout])

router.post(
  "/admin",
  [verifyToken, admin, emailExists, usernameExists],
  createUser
)
router.delete("/admin/:userId", [verifyToken, admin], deleteUser)
router.get("/admin", [verifyToken, admin], getUsers)
router.patch("/admin/:userId", [verifyToken, admin], editUser)

module.exports = router
