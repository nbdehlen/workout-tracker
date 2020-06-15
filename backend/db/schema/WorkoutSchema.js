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
    required: true,
    // default: Date.now,
    trim: true,
    maxlength: 50,
    minLength: 1,
  },

  grade: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
    min: [0, 'Value neeeds to be on a scale between 0 and 10'],
    max: [10, 'Value neeeds to be on a scale between 0 and 10'],
  },


  exercises: [
    {
      exerciseType: {
        type: String,
        trim: true,
        maxlength: 50,
        lowercase: true,
      },
      name: {
        type: String,
        trim: true,
        maxlength: 50,
        lowercase: true,
      },
      compound: {
        type: Boolean,
        default: true,
      },
      mainMuscle: {
        type: String,
        trim: true,
        maxlength: 50,
        lowercase: true,
      },
      secondaryMuscles: [{
        type: String,
        trim: true,
        maxlength: 50,
        lowercase: true,
      }],
      tool: {
        type: String,
        trim: true,
        maxlength: 50,
        lowercase: true,
      },
      unilateral: {
        type: Boolean,
        default: false,
      },
      sets: [{
        weight: {
          type: Number,
          max: [1000, 'You didn\'t lift {VALUE} KGs. Why you always lying'],
          min: [-200, 'So your lift was assisted by {VALUE} KGs? lowest acceptable number is -200'],
        },
        reps: {
          type: Number,
          max: [1000, 'You didn\'t do {VALUE} reps. Why you always lying'],
          min: [1, 'You did 0 reps? so it\'s almost like you shouldnt log it?'],
        },
        rest: {
          type: String,
          trim: true,
          maxlength: 50,
          lowercase: true,
        },
        time: {
          type: String,
          trim: true,
          maxlength: 50,
          lowercase: true,
        },
      }],

      length: {
        type: String,
        trim: true,
        maxlength: 50,
        lowercase: true,
      },
      calories: {
        type: Number,
        max: [10000, 'Come on dude, you didn\'t just burn {VALUE} calories in a single workout.'],
        min: [0, 'So you stuffed your face while working out and want to put a negative number? Just mark it zero'],
        validate: {
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value',
        },
      },
    },
  ],

  end: {
    type: Date,
    trim: true,
    maxlength: 50,
  },
});

module.exports = mongoose.model('Workout', WorkoutSchema);
