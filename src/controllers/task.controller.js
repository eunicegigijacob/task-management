const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../repository/task.repository");

const { addTaskSchema, updateTaskSchema } = require("../schemas/task.schema");

exports.addTask = async (req, res, next) => {
  try {
    const { title, description, due_date, status } = addTaskSchema.parse(
      req.body
    );
    if (!title || !due_date) {
      return res
        .status(400)
        .json({ error: "Title and due_date are required." });
    }

    const task = await addTask(title, description, due_date, status);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const parsedLimit = Math.max(parseInt(limit, 10) || 10, 1);

    const { tasks, pagination } = await getAllTasks(parsedPage, parsedLimit);

    res.json({
      tasks,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fields = updateTaskSchema.parse(req.body);

    if (!id) {
      return res
        .status(400)
        .json({ error: "Please provide identifier for task to be updated" });
    }

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ error: "No fields provided for update." });
    }

    const updatedTask = await updateTask(id, fields);
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Please provide identifier for task to be deleted" });
    }

    const deletedTask = await deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    next(error);
  }
};
