const router = require("express").Router();
const taskController = require("../app/controller/task.controller");

router.get("/", taskController.home);
router.get("/tasks", taskController.tasks);
router.get("/task/:id", taskController.task);
router.get("/addTask", taskController.addTask);
router.post("/addTask", taskController.addTaskLogic);
router.get("/changeStatus/:id", taskController.changeStatus);
router.get("/updateTask/:id", taskController.updateTask);
router.post("/updateTask/:id", taskController.updateTaskLogic);
router.get("/deleteTask/:id", taskController.deleteTask);

module.exports = router;