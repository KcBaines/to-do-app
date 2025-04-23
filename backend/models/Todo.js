const mongoose = require('mongoose');

// Define the schema for the Todo model
const todoSchema = mongoose.Schema({
  // Reference to the User model (assumes a User model exists with ObjectId)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true // This field is mandatory
  },
  // The task description
  todo: {
    type: String,
    required: true, // This field is mandatory
    maxlength: 140 // The maximum length for the task description
  },
  // Status indicating if the task is completed
  completed: {
    type: Boolean,
    default: false // Default value is false (incomplete)
  }
});

// Export the Todo model based on the todoSchema
module.exports = mongoose.model('Todo', todoSchema);
