const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded());

let tasks = [];

app.get("/", (req, res) => {
    res.render("dashboard", { tasks });
});

app.get("/add", (req, res) => {
    res.render("add-task");
});

app.get("/add-task", (req, res) => {

    let task = {
        id: parseInt(req.query.id),
        title: req.query.title,
        description: req.query.description,
        priority: req.query.priority,
        status: req.query.status
    };

    tasks[tasks.length] = task;

    res.render("dashboard", { tasks });
});

app.get("/delete", (req, res) => {

    let taskId = parseInt(req.query.id);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            tasks.splice(i, 1);
            break;
        }
    }

    res.render("dashboard", { tasks });
});

app.get("/edit", (req, res) => {

    let taskId = parseInt(req.query.id);
    let task = null;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            task = tasks[i];
        }
    }

    res.render("edit-task", { task });
});

app.get("/update", (req, res) => {

    let taskId = parseInt(req.query.id);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            tasks[i].title = req.query.title;
            tasks[i].description = req.query.description;
            tasks[i].priority = req.query.priority;
            tasks[i].status = req.query.status;
        }
    }

    res.render("dashboard", { tasks });
});

app.listen(8000, () => {
    console.log("http://localhost:8000");
});