const express = require("express");
const taskController = require("../controllers/task.controller");
const router = express.Router();

router.post("/", taskController.addTask);
router.get("/", taskController.getAllTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
