const mongoose = require('mongoose');


const WorkoutSchema = mongoose.Schema({

  type: {
    type: String,
    default: 'General',
    required: true,
    lowercase: true,
    trim: true,
    maxlength: 50,
  },

  start: {
    type: Date,
    default: Date.now,
    required: true,
    trim: true,
    maxlength: 50,
  },

  end: {
    type: Date,
    trim: true,
    maxlength: 50,
  },
});

module.exports = mongoose.model('Workout', WorkoutSchema);
