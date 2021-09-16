const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    
    exercises: [
      {
        bodyPart: String,
        equipment: String,
        gifUrl: String,
        id: String,
        name: String,
        target: String, 
        day: String,
        sets: Number,
        reps: Number
      }
    ],  

    description: String,

    workoutGoals: {
        type: String,
        enum: ["Lose fat", "Get fit", "Gain muscle"],
      },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    reviews: [
      {
        name: String, 
        comment: String,
    },
    ],
    
  //   comments: [{
  //     commentBody: {
  //         type: String
  //     },
  //     commentUser: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "User"
  //     },
  //     commentDate: {
  //         type: Date,
  //         default: Date.now
  //     }
  // }],

    like: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like' 

   
  }],

  date: {
    type: Date,
    default: Date.now
},
  
},

  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;



