const createError = require("http-errors")
const mongoose = require("mongoose")
const WorkoutSchema = require("../db/schema/WorkoutSchema")

const getWorkout = async (_, res, next) => {
  try {
    const result = await WorkoutSchema.find({}).limit(10000)

    return res
      .status(200)
      .json(result.map((entry) => entry.toObject({ getters: true })))
  } catch (error) {
    return next(error)
  }
}

const getWorkoutById = async (req, res, next) => {
  const { workoutId } = req.params

  try {
    const result = await WorkoutSchema.findById(workoutId)

    if (!result) {
      throw createError(404, `Workout ID ${workoutId} does not exist`)
    }
    return res.status(200).json(result.toObject({ getters: true }))
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(createError(400, `Workout ID ${workoutId} is invalid`))
    }
    return next(error)
  }
}

const postWorkout = async (req, res, next) => {
  try {
    const { author, type, start, grade, end, exercises } = req.body

    const workout = new WorkoutSchema({
      author,
      type,
      start,
      grade,
      end,
      exercises,
    })

    await workout.save()

    return res.status(201).json(workout.toObject({ getters: true }))
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message))
    }
    return next(error)
  }
}

const patchWorkoutById = async (req, res, next) => {
  const { body } = req
  const { workoutId } = req.params

  console.log(body)
  if (!body) {
    throw createError(400, "Body is empty")
  }

  try {
    const result = await WorkoutSchema.findOneAndUpdate(
      { _id: workoutId },
      { $set: body },
      { new: true }
    )

    if (!result) {
      throw createError(404, `Workout ID ${workoutId} does not exist`)
    }

    return res.status(200).json(result.toObject({ getters: true }))
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(
        createError(400, `Parameters or workout ID ${workoutId} is invalid`)
      )
    }
    return next(error)
  }
}

const deleteWorkoutById = async (req, res, next) => {
  const { workoutId } = req.params

  try {
    const result = await WorkoutSchema.findByIdAndDelete({
      _id: workoutId,
    })

    if (!result) {
      throw createError(404, `Workout ID ${workoutId} does not exist`)
    }

    return res.status(200).json({
      message: `Deleted workout ${workoutId}`,
    })
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(createError(400, `Workout ID ${workoutId} is invalid`))
    }
    return next(error)
  }
}

const getUserWorkouts = async (req, res, next) => {
  const { userId } = req

  try {
    const result = await WorkoutSchema.find({ author: userId }).sort({
      start: "desc",
    })

    if (!result) {
      return res.status(404).json({
        Error: `User ${userId} does not exist`,
      })
    }
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

const patchUserWorkoutById = async (req, res, next) => {
  const { body } = req
  const { workoutId } = req.params
  const { userId } = req

  if (Object.entries(body).length === 0) {
    return next(createError(422, "Body is empty"))
  }

  try {
    const result = await WorkoutSchema.findOneAndUpdate(
      { _id: workoutId, author: userId },
      { $set: body },
      { new: true }
    )

    if (!result) {
      throw createError(404, `Workout ID ${workoutId} does not exist`)
    }

    return res.status(200).json(result.toObject({ getters: true }))
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(
        createError(400, `Parameters or workout ID ${workoutId} is invalid`)
      )
    }
    return next(error)
  }
}

const deleteUserWorkoutById = async (req, res, next) => {
  const { workoutId } = req.params
  const { userId } = req

  try {
    const result = await WorkoutSchema.findByIdAndDelete({
      _id: workoutId,
      author: userId,
    })

    if (!result) {
      throw createError(404, `Workout ID ${workoutId} does not exist`)
    }

    return res.status(200).json({
      message: `Deleted workout ${workoutId}`,
    })
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(createError(400, `Workout ID ${workoutId} is invalid`))
    }
    return next(error)
  }
}

const postUserWorkout = async (req, res, next) => {
  if (Object.entries(req.body).length === 0) {
    return next(createError(422, "Body is empty"))
  }

  try {
    const { type, start, grade, end, exercises } = req.body
    if (req.userId === undefined) {
      return next(createError(504, "User not logged in"))
    }
    const { userId } = req

    const workout = new WorkoutSchema({
      author: userId,
      type,
      start,
      grade,
      end,
      exercises,
    })

    await workout.save()

    return res.status(201).json(workout.toObject({ getters: true }))
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message))
    }
    return next(error)
  }
}

module.exports = {
  getWorkout,
  getWorkoutById,
  postWorkout,
  patchWorkoutById,
  deleteWorkoutById,
  getUserWorkouts,
  patchUserWorkoutById,
  deleteUserWorkoutById,
  postUserWorkout,
}
