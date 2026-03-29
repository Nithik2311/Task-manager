const pool = require('../config/database');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.validatedData;
    const userId = req.user.id;
    const createdAt = new Date();

    const [result] = await pool.execute(
      'INSERT INTO tasks (user_id, title, description, status, created_at) VALUES (?, ?, ?, ?, ?)',
      [userId, title, description || null, status, createdAt]
    );

    return res.status(201).json({
      status: 'success',
      message: 'Task created successfully',
      data: {
        id: result.insertId,
        user_id: userId,
        title,
        description: description || null,
        status,
        created_at: createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error creating task',
      error: error.message
    });
  }
};

// Get all tasks with pagination
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit } = req.pagination;
    const offset = (page - 1) * limit;

    console.log('Getting tasks for user:', userId, 'page:', page, 'limit:', limit);

    // Get total count
    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM tasks WHERE user_id = ?',
      [userId]
    );
    const total = countResult[0].total;

    console.log('Total tasks found:', total);

    // Get paginated tasks
    const [tasks] = await pool.execute(
      `SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`,[userId]
    );

    console.log('Tasks retrieved:', tasks.length);

    return res.status(200).json({
      status: 'success',
      message: 'Tasks retrieved successfully',
      data: tasks,
      pagination: {
        current_page: page,
        per_page: limit,
        total: total,
        total_pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error in getAllTasks:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error retrieving tasks',
      error: error.message
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [tasks] = await pool.execute(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Task retrieved successfully',
      data: tasks[0]
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error retrieving task',
      error: error.message
    });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    // Validate status
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status. Must be one of: pending, in-progress, completed'
      });
    }

    // Check if task exists
    const [existingTasks] = await pool.execute(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }

    // Update task
    await pool.execute(
      'UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?',
      [status, id, userId]
    );

    return res.status(200).json({
      status: 'success',
      message: 'Task status updated successfully',
      data: {
        id: parseInt(id),
        status
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error updating task',
      error: error.message
    });
  }
};

// Update entire task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.validatedData;
    const userId = req.user.id;

    // Check if task exists
    const [existingTasks] = await pool.execute(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }

    // Update task
    await pool.execute(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
      [title, description || null, status, id, userId]
    );

    return res.status(200).json({
      status: 'success',
      message: 'Task updated successfully',
      data: {
        id: parseInt(id),
        title,
        description: description || null,
        status
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error updating task',
      error: error.message
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if task exists
    const [existingTasks] = await pool.execute(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }

    // Delete task
    await pool.execute(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    return res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error deleting task',
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
  updateTask,
  deleteTask
};
