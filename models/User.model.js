const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  
  username: {
    type: String,
    unique: true,
  },

  password: String,

  bio: String,

  email: String,

  photo: {
    type: String,
    default: "http://placekitten.com/200/200",
  },

});

const User = model("User", userSchema);

module.exports = User;
