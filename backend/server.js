require("dotenv").config();
// bring express in Node.js
const express = require("express");

// installing cors middleware
const cors = require("cors");

// create express app using what we imported
const app = express();
const mongoose = require("mongoose");

// use cors middleware to handle requests
app.use(cors());
app.use(express.json());
const Task = require("./Models/Task");

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("MongoDB connected successfully");
}).catch((error)=>{
  console.log("MongoDB Connection failed:",error.message);
});

app.get("/api/tasks",async (req, res) =>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(error){
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
    
});

app.get("/api/tasks/:id", async (req, res)=>{
    try{
        const task = await Task.findById(id);
        if(!task){
            return res.status(404).json({message : "Task not found!"});
        }
        res.json(task);
    }catch(error){
        res.status(500).json({ message: "Failed to fetch task" });
    }
})
app.put("/api/tasks/:id",async (req, res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!task){
            return res.status(404).json({message : "Task not found!"});
        }
        res.json(task);
    }catch {
        res.status(500).json({ message: "Failed to update task" });
    }
})
app.delete("/api/tasks/:id",async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            return res.status(404).json({error:"Task not found"});
        }
        res.json(deletedTask);
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.post("/api/tasks",async (req, res)=>{
    try{
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    }catch(error){
        res.status(500).json({ message: "Failed to create task" });
    }
})

// API Route (Testing Backend)
app.get("/", (req, res) => {
    res.send("Backend is Working!!")
});

// start the server and listen to port 5000
app.listen(5050, () => {
    console.log("Server is Running on port 5050");
});