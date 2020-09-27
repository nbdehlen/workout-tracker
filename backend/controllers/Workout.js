const createError = require('http-errors');
const mongoose = require('mongoose');
const WorkoutSchema = require('../db/schema/WorkoutSchema');
// const protoChain = require('../utils/protoChain');

const getWorkout = async (req, res, next) => {
  try {
    const result = await WorkoutSchema.find({}).limit(10000);

    return res.status(200).json(result.map((entry) => entry.toObject({ getters: true })));
  } catch (error) {
    next(error);
  }
};

const getWorkoutById = async (req, res, next) => {
  const { workoutId } = req.params;

  try {
    const result = await WorkoutSchema.findById(workoutId);

    if (!result) {
      throw createError(404, `Workout ID ${workoutId} does not exist`);
    }
    // protoChain(result);
    return res.status(200).json(result.toObject({ getters: true }));
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(createError(400, `Workout ID ${workoutId} is invalid`));
    }
    next(error);
  }
};

const postWorkout = async (req, res, next) => {
  try {
    const { author, type, start, grade, end, exercises } = req.body;

    const workout = new WorkoutSchema({
      author,
      type,
      start,
      grade,
      end,
      exercises,
    });

    await workout.save();

    return res.status(201).json(workout.toObject({ getters: true }));
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(createError(422, error.message));
    }
    next(error);
  }
};

const patchWorkoutById = async (req, res, next) => {
  const { body } = req;
  const { workoutId } = req.params;

  try {
    const result = await WorkoutSchema.findOneAndUpdate(
      { _id: workoutId },
      { $set: body },
      { new: true },
    );

    if (!result) {
      throw createError(404, `Workout ID ${workoutId} does not exist`);
    }

    return res.status(200).json(result.toObject({ getters: true }));
  } catch (error) {
    console.log(error.name);
    if (error instanceof mongoose.CastError) {
      // build custom error handler for CastErrors?
      // Need standardized error messages for the repeating errors.

      return next(createError(400, `Parameters or workout ID ${workoutId} is invalid`));
    }
    next(error);
  }
};

const deleteWorkoutById = async (req, res, next) => {
  const { workoutId } = req.params;

  try {
    const result = await WorkoutSchema.findByIdAndDelete({
      _id: workoutId,
    });

    if (!result) {
      throw createError(404, `Workout ID ${workoutId} does not exist`);
    }

    return res.status(200).json({
      message: `Deleted workout ${workoutId}`,
    });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(createError(400, `Workout ID ${workoutId} is invalid`));
    }
    next(error);
  }
};

// WORKS!!
/*
Need to restructure a lot though.
I think I can only check for req.userId and dont need to send in req.params.userid and compare

*/
const testGetWorkout = async (req, res, next) => {
  const { userid } = req.params;

  console.log('in testgetworkout');
  console.log(req.params);
  console.log(req.headers);
  console.log(`req.userId: ${req.userId}`);

  if (userid !== req.userId) {
    return res.status(500).json({ Error: 'Incorrect user id' });
  }

  try {
    const result = await WorkoutSchema.find({ author: userid });

    if (!result) {
      return res.status(404).json({
        Error: `User ${userid} does not exist`,
      });
    }
    // protoChain(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// "2020-06-11T14:50:40Z"
// 5ee293f614368832c4f17be9

module.exports = {
  getWorkout,
  getWorkoutById,
  postWorkout,
  patchWorkoutById,
  deleteWorkoutById,
  testGetWorkout,
};
