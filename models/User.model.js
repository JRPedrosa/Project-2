const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  bio: String,

  email: {
    type: String,
    required: true
  },

  photo: {
    type: String,
 
  },
  gender: { type: String, enum: ["female", "male", "prefer not to say"] },
  age: {
    type: Number,
  },
  height: { type: Number },
  weight: { type: Number },
  disability: {
    type: String,
    default: "no",
    enum: ["yes", "no",],
  },
  activityLevel: { type: String, enum: ["lazy bastard", "active", "athlete", "beast"] },
  expectedDays: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7] },
  workoutGoals: {
    type: String,
    enum: ["Lose fat", "Get fit", "Gain muscle"],
  },
});

const User = model("User", userSchema);

module.exports = User;
