const WorkoutSchema = require('../models/WorkoutSchema.js');

const getWorkout = async (req, res) => {
  try {
    const result = await WorkoutSchema.find({}).limit(1000);
    return res.status(200).json(result);
  } catch (error) {
    return res.json(error.message);
  }
};

const getWorkoutById = async (req, res) => {
  try {
    const result = await WorkoutSchema.findById(req.params.workoutId);
    return res.status(200).json(result);
  } catch (error) {
    return res.json(error.message);
  }
};

const postWorkout = async (req, res) => {
  try {
    const { type, start, end } = req.body;
    const workout = new WorkoutSchema({
      type,
      start,
      end,
    });

    await workout.save();

    return res.status(200).json(workout);
  } catch (error) {
    return res.json(error.message);
  }
};

const patchWorkoutById = async (req, res) => {
  try {
    const { body } = req;
    const result = await WorkoutSchema.findOneAndUpdate({ _id: req.params.workoutId }, { $set: body });
    return res.status(200).json(result);
  } catch (error) {
    return res.json(error.message);
  }
};

const deleteWorkoutById = async (req, res) => {
  try {
    const result = await WorkoutSchema.findByIdAndDelete({ _id: req.params.workoutId });
    return res.status(200).json(result);
    // res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
};

// "2020-06-11T14:50:40Z"
// 5ee293f614368832c4f17be9

module.exports = {
  getWorkout, getWorkoutById, postWorkout, patchWorkoutById, deleteWorkoutById,
};
