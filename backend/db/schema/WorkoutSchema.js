const mongoose = require("mongoose");
const strTrimLcLen50 = require("./utils/defSchemaObjects");

// use mongoDBs version of `findOneAndUpdate`
mongoose.set("useFindAndModify", false);

const WorkoutSchema = mongoose.Schema({
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },

  type: {
    type: String,
    default: "General",
    trim: true,
    maxlength: [50, "Max char length is 50"],
  },

  start: {
    type: Date,
    required: "Must have start date - default value is the created date",
    default: Date.now,
    trim: true,
    maxlength: [100, "Max char length is 100"],
    minLength: [1, "Min char length is 1"],
  },

  grade: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
    min: [1, "Value neeeds to be on a scale between 0 and 10"],
    max: [10, "Value neeeds to be on a scale between 0 and 10"],
  },

  exercises: [
    {
      exerciseType: strTrimLcLen50,
      name: strTrimLcLen50,
      compound: {
        type: Boolean,
        default: true,
      },
      mainMuscle: strTrimLcLen50,
      secondaryMuscles: [strTrimLcLen50],
      tool: strTrimLcLen50,
      unilateral: {
        type: Boolean,
        default: false,
      },
      sets: [
        {
          weight: {
            type: Number,
            max: [1000, "You didn't lift {VALUE} KGs. Why you always lying"],
            min: [
              -200,
              "So your lift was assisted by {VALUE} KGs? lowest acceptable number is -200",
            ],
          },
          reps: {
            type: Number,
            max: [10000, "You didn't do {VALUE} reps. Why you always lying"],
            // min: [
            //   1,
            //   "You did 0 reps? so it's almost like you shouldnt log it?",
            // ],
          },
          rest: strTrimLcLen50,
          time: strTrimLcLen50,
        },
      ],

      duration: strTrimLcLen50,
      calories: {
        type: Number,
        max: [
          10000,
          "Come on dude, you didn't just burn {VALUE} calories in a single workout.",
        ],
        min: [
          0,
          "So you stuffed your face while working out and want to put a negative number? Just mark it zero",
        ],
        validate: {
          validator: Number.isInteger,
          message: "{VALUE} is not an integer value",
        },
      },
    },
  ],

  end: {
    type: Date,
    required: "Must have end date - default value is the created date +1 hour",
    default: () => new Date(Date.now() + 60 * 60 * 1000),
    trim: true,
    maxlength: [100, "Max char length is 100"],
  },
});

// const workoutModel = mongoose.model('Workout', WorkoutSchema);

// Pre hook for `findOneAndUpdate`. (arrow func doesnt work)
WorkoutSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Workout", WorkoutSchema);
