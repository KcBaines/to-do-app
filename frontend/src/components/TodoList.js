import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [message, setMessage] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8080/user-data/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Failed to fetch tasks"));
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      setMessage("Task cannot be empty");
      clearMessageAfterDelay();
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/user-data/todos",
        { todo: newTask },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks([...tasks, res.data]);
      setNewTask("");
      setMessage("Task added successfully");
      clearMessageAfterDelay();
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Failed to add task"));
      clearMessageAfterDelay();
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user-data/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      setMessage("Task deleted successfully");
      clearMessageAfterDelay();
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Failed to delete task"));
      clearMessageAfterDelay();
    }
  };

  const handleCheckboxChange = async (todoId, isChecked) => {
    try {
      await axios.put(
        `http://localhost:8080/user-data/todos/`,
        { todoId: todoId, completed: isChecked },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === todoId ? { ...task, completed: isChecked } : task
        )
      );
      setMessage(
        isChecked ? "Task marked as completed." : "Task marked as incomplete."
      );
      clearMessageAfterDelay();
    } catch (error) {
      console.error("Error updating task:", error);
      setMessage("Error: " + (error.response?.data?.message || "Failed to update task status"));
      clearMessageAfterDelay();
    }
  };

  const startEditingTask = (task) => {
    setEditTaskId(task._id);
    setEditedTaskText(task.todo);
  };

  const editTask = async () => {
    if (!editedTaskText.trim()) {
      setMessage("Task text cannot be empty.");
      clearMessageAfterDelay();
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/user-data/todos/${editTaskId}`,
        { todo: editedTaskText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === editTaskId ? { ...task, todo: editedTaskText } : task
        )
      );
      setEditTaskId(null);
      setEditedTaskText("");
      setMessage("Task updated successfully");
      clearMessageAfterDelay();
    } catch (error) {
      console.error("Error updating task:", error);
      setMessage("Error: " + (error.response?.data?.message || "Failed to update task"));
      clearMessageAfterDelay();
    }
  };

  const clearMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <div className="box1">
        <input
          className="task-input"
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="button" onClick={addTask}>
          Add Task
        </button>
        <ol>
          {tasks.map((task) => (
            <li key={task._id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) =>
                  handleCheckboxChange(task._id, e.target.checked)
                }
              />
              {editTaskId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                  <button onClick={editTask}>Save</button>
                  <button onClick={() => setEditTaskId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {task.todo}
                  <button
                    className="bi bi-pencil"
                    onClick={() => startEditingTask(task)}
                  >
                  </button>
                  <button
                    className="bi bi-trash"
                    onClick={() => deleteTask(task._id)}
                  >
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TodoList;
