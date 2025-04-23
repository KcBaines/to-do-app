const express = require("express");
const { jwtMiddleware } = require("../../middleware/jwtMiddleware");
const {
  registerUser,
  loginUser,
  getTodos,
  addTodo,
  checkTodo,
  removeTodo,
  editTodo, // Add the new editTodo controller function
} = require("../../controllers/userController");
const {
  validateUsername,
  validateContentType,
} = require("../../middleware/validationMiddleware");

const router = express.Router();

// Apply JWT middleware to all routes
router.use(jwtMiddleware);

// User routes
router.post("/register", validateContentType, validateUsername, registerUser);
router.post("/login", validateContentType, loginUser);

// Todo routes
router.get("/todos", getTodos);
router.post("/todos", addTodo);
router.put("/todos", checkTodo); // Update only the status
router.put("/todos/:id", editTodo); // Update the todo text by ID
router.delete("/todos/:id", removeTodo);

module.exports = router;
