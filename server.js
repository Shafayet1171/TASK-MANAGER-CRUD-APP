const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];
let idCounter = 1;

// Task Create

app.post('/tasks', (req, res) => {
    const { title, description = "", status = "To Do" } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
    }

    const newTask = {
        id: idCounter++,
        title: title.trim(),
        description,
        status
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created successfully",
        task: newTask
    });
});

// Getting all tasks

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// task update

app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    res.json({
        message: "Task updated successfully",
        task
    });
});

//Deletion of task 

app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = tasks.splice(index, 1);

    res.json({
        message: "Task deleted successfully",
        deletedTask
    });
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});