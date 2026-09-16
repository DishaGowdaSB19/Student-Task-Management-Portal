import { useState } from "react";

export default function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      status: "Pending",
    };

    //expection handling for fetch request
    try{ 
      const response = await fetch("http://localhost:5050/api/tasks", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newTask)
    });
    const data = await response.json();
    props.AddTask(data);
    }catch(error){
      console.error("Error adding task:", error);
    }
  }

  return (
    <div className="add-task">
      <form onSubmit={handleSubmit}>
        <label> Add Title </label>
        <input
          type="text"
          value={title}
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label> Add Description </label>
        <input
          type="text"
          value={description}
          placeholder="Task description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}