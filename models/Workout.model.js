const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
 

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

    Description: String,

    workoutGoals: {
        type: String,
        enum: ["loseFat", "getFit", "gainMuscle"],
      },

   
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
