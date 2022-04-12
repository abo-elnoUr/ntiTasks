const taskHelper = require("../helper/task.helper");

class Task {
    static home = (req, res) => {
        res.render("home", {
            title: "Home",
        });
    };
    static addTask = (req, res) => {
        res.render("addTask", {
            title: "add task",
        });
    };
    static addTaskLogic = (req, res) => {
        const task = { id: Date.now(), ...req.body, status: false };
        const taskAdded = taskHelper.addTask(task);
        if (taskAdded) {
            return res.redirect("/tasks");
        } else {
            res.send("may be title exist!");
        }
    };
    static tasks = (req, res) => {
        const allTasks = taskHelper.tasks();
        res.render("tasks", {
            title: "tasks",
            allTasks,
        });
    };
    static task = (req, res) => {
        const task = taskHelper.task(req.params.id);
        if (task) {
            res.render("task", {
                title: "task",
                task,
            });
        } else {
            res.send("error on get task!");
        }
    };
    static changeStatus = (req, res) => {
        const statusChanged = taskHelper.changeStatus(
            req.params.id,
            req.body.status
        );
        if (statusChanged) {
            return res.redirect("/tasks");
        } else {
            res.send("error on delete task");
        }
    };
    static updateTask = (req, res) => {
        const task = taskHelper.task(req.params.id);
        res.render("updateTask", {
            title: "update task",
            task,
        });
    };
    static updateTaskLogic = (req, res) => {
        const updatedTask = taskHelper.updateTask(req.params.id, req.body);
        if (updatedTask) {
            return res.redirect("/tasks");
        } else {
            res.send("failed to update!");
        }
    };
    static deleteTask = (req, res) => {
        const taskDeleted = taskHelper.deleteTask(req.params.id);
        if (taskDeleted) {
            return res.redirect("/tasks");
        } else {
            res.send("error on delete task");
        }
    };
}

module.exports = Task;