const mongoose = require('mongoose');
const {
  Schema,
  model
} = mongoose;

const likesSchema = new Schema({
  user: 
  {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  },
  workout: 
  {
    type: Schema.Types.ObjectId,
    ref: 'Workout' 
  }
}, {
  timestamps: true
});

module.exports = model('Like', likesSchema);