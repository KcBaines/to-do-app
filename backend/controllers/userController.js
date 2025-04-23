const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');
const jwtSecret = 'HyperionDev'; // Secret key for signing JWT tokens
const User = require('../../backend/models/User');

// User login controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email and password
    const user = await User.findOne({ email: email, password: password});
    if (!user) {
        // If user not found, respond with an error
        return res.status(401).json({ message: 'Incorrect user credentials' });
    }

    // Create the payload for the JWT Token
    const payload = {
        name: email, // Using email as username in payload
        admin: false, // User is not an admin by default
    };

    // Create the JWT Token
    const token = jwt.sign(payload, jwtSecret, {
        algorithm: 'HS256', // Algorithm used to sign the token
    });

    // Respond with success message and token
    res.json({ message: `Login successful for username: ${email}`, token });
};

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            // If user already exists, respond with an error
            return res.status(400).json({ message: 'User already exists' });
        }

        // If you don't want a separate username, you can set the username to email
        const newUser = new User({ email, password, username: email });  // Set username to email if not required separately
        await newUser.save();
        
        // Respond with success message
        res.status(201).json({ message: 'Registration successful! You are being redirected to the login page...' });
    } catch (error) {
        console.error('Error registering user:', error);  // Log error for debugging
        res.status(400).json({ message: 'Registration failed. ' + error.message });
    }
};


// Get Todos controller
const getTodos = async (req, res) => {
    const { name } = req.payload; // Extract email from token payload
    const user = await User.findOne({ email: name }); // Find user by email
    if (user) {
        // Find todos for the user
        const usersTodoList = await Todo.find({ userId: user._id });
        res.json(usersTodoList); // Respond with the list of todos
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Add Todo controller
const addTodo = async (req, res) => {
    const { todo } = req.body;
    const { name } = req.payload; // Extract email from token payload

    // Validate that the todo is within the allowed length
    if (todo.length > 140) {
        return res.status(400).json({ message: 'Task exceeds 140 characters' });
    }

    const user = await User.findOne({ email: name }); // Find user by email
    if (user) {
        try {
            // Create and save a new todo item
            const newTodo = new Todo({
                userId: user._id,
                todo: todo,
                completed: false
            });
            await newTodo.save();
            res.json(newTodo); // Respond with the created todo
        } catch (error) {
            console.error('Error creating todo:', error); // Log error for debugging
            res.status(500).json({ message: 'Error creating todo' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Check off Todo controller
const checkTodo = async (req, res) => {
    const { name } = req.payload; // Extract email from token payload
    const { todoId, completed } = req.body; // Extract todo ID and completion status

    const user = await User.findOne({ email: name }); // Find user by email
    if (user) {
        const todo = await Todo.findOne({_id: todoId}); // Find todo by ID
        if (todo) {
            todo.completed = completed; // Update todo completion status
            await todo.save(); // Save changes
            res.status(200).json({ message: 'Todo Checked' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Remove Todo controller
const removeTodo = async (req, res) => {
    const { name } = req.payload; // Extract email from token payload
    const user = await User.findOne({ email: name }); // Find user by email
    if (user) {
        try {
            // Delete the todo item by ID
            const todo = await Todo.findByIdAndDelete(req.params.id); 
            if (!todo) {
                return res.status(404).send("Todo was not found"); 
            }
            res.send({ message: "Todo deleted successfully" }); 
        } catch (error) {
            console.error("Error deleting todo:", error); // Log error for debugging
            res.status(500).send("Error deleting todo");
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const editTodo = async (req, res) => {
    try {
      const { id } = req.params; // Get todo ID from request parameters
      const { todo } = req.body; // Get new todo text from request body
  
      // Find the todo by ID and update its text
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { todo },
        { new: true } // Return the updated document
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      res.json(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ message: "Failed to update todo" });
    }
  };
  
  module.exports = {
    registerUser,
    loginUser,
    getTodos,
    addTodo,
    checkTodo,
    removeTodo,
    editTodo  // Export the new editTodo function
  };