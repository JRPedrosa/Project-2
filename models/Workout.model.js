const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
 
    day1: {
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
    },

    day2: {
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
    },

    day3: {
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
    },

    day4: {
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
    },

    day5: {
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
    },

    day6: {
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
    },

    day7: {
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
    },
    

    description: String,

    workoutGoals: {
        type: String,
        enum: ["Lose fat", "Get fit", "Gain muscle"],
      },

   
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;





// const mongoose = require("mongoose")
// const UserSchema = require("./UserSchema")

// const WorkoutSchema = new mongoose.Schema({
//   user: { type: mongoose.Types.ObjectId, ref: "Users" },
//   //user: String,
//   workout: {
    
//     day1: {
//       button: { type: String },
//       exercises: [[]],
//       panels: [{ type: Number }],
//     },
//     day2: {
//       button: { type: String },
//       exercises: [[]],
//       panels: [{ type: Number }],
//     },
//     day3: {
//       button: { type: String },
//       exercises: [[]],
//       panels: [{ type: Number }],
//     },
//     day4: {
//       button: { type: String },
//       exercises: [[]],
//       panels: [{ type: Number }],
//     },
//     day5: {
//       button: { type: String },
//       exercises: [[]],
//       panels: [{ type: Number }],
//     },
//     day6: {
//       button: { type: String },
//       exercises: [[]],
//       panels: [{ type: Number }],
//     },
//     day7: {
//       button: { type: String },
//       exercises: [[]],
//       panels: [{ type: Number }],
//     },
//   },
// })

// module.exports = WorkoutSchema