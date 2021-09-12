const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
    {
        title: String,
        // exercise1: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "exercise1"
        // },
        // exercise2: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "exercise2"
        // },
        // exercise3: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "exercise3"
        // },      
        exercise1: String,
        exercise2: String,
        exercise3: String,
        exercises: [ {} ]
    },
    {
        timestamps: true,
    }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;