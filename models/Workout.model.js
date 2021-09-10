const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    title: String,

    exercise: [
      {
        bodyPart: String,
        equipment: String,
        gifUrl: String,
        id: String,
        name: String,
        target: String,
      },
    ],
    // exercise1: String,
    // exercise2: String,
    // exercise3: String,
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
