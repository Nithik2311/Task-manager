const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');
const { validateTask, paginationValidation } = require('../middleware/validation');

// All task routes require authentication
router.use(authenticateToken);

// Create task
router.post('/', validateTask, createTask);

// Get all tasks with pagination
router.get('/', paginationValidation, getAllTasks);

// Get task by ID
router.get('/:id', getTaskById);

// Update task status
router.patch('/:id/status', updateTaskStatus);

// Update entire task
router.put('/:id', validateTask, updateTask);

// Delete task
router.delete('/:id', deleteTask);

module.exports = router;
