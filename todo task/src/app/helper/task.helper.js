const deal = require("./dealWithJSON.helper");
const fileName = process.env.fileName;

class Task {
    static createTaskObj = (data) => {
        return {
            id: data.id,
            title: data.title,
            content: data.content,
            date: data.date,
            status: data.status,
        };
    };
    static searchInTasks = (
        allTasks,
        searchKey,
        searchVal,
        searchType = "singleIndex"
    ) => {
        if (searchType == "singleIndex")
            return allTasks.findIndex((task) => task[searchKey] == searchVal);
        else if (searchType == "singleData")
            return allTasks.find((task) => task[searchKey] == searchVal);
        else return allTasks.filter((task) => task[searchKey] == searchVal);
    };
    static tasks = () => {
        try {
            const allTasks = deal.readDataFromJSON(fileName);
            return allTasks;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    };
    static task = (id) => {
        try {
            const allTasks = deal.readDataFromJSON(fileName);
            const task = this.searchInTasks(allTasks, "id", id, "singleData");
            if (!task) throw new Error("task not found");
            return task;
        } catch (e) {
            console.log(e.message);
            return true;
        }
    };
    static addTask = (data) => {
        try {
            const allTasks = deal.readDataFromJSON(fileName);
            if (this.searchInTasks(allTasks, "title", data.title) != -1)
                throw new Error("Title already exist!");
            allTasks.push(data);
            deal.writeDataToJSON(fileName, allTasks);
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    };
    static changeStatus = (id, status) => {
        try {
            const allTasks = deal.readDataFromJSON(fileName);
            const taskIndex = this.searchInTasks(allTasks, "id", id);
            if (taskIndex == -1) throw new Error("task not found");
            allTasks[taskIndex].status = status;
            deal.writeDataToJSON(fileName, allTasks);
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    };
    static updateTask = (id, data) => {
        try {
            const allTasks = deal.readDataFromJSON(fileName);
            const taskIndex = this.searchInTasks(allTasks, "id", id);
            if (taskIndex == -1) throw new Error("task not found");
            if (data.status == undefined) {
                data.status = false;
            } else {
                data.status = true;
            }
            const task = {
                id: id,
                ...data,
                status: data.status,
            };
            allTasks[taskIndex] = task;
            deal.writeDataToJSON(fileName, allTasks);
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    };
    static deleteTask = (id) => {
        try {
            const allTasks = deal.readDataFromJSON(fileName);
            const taskIndex = this.searchInTasks(allTasks, "id", id);
            if (taskIndex == -1) throw new Error("task not found");
            allTasks.splice(taskIndex, 1);
            deal.writeDataToJSON(fileName, allTasks);
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    };
}

module.exports = Task;