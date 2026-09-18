
import { useState } from "react";

import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

const DEFAULT_API_URL = "http://localhost:5050/api/tasks";

function Dashboard({ tasks = [], setTasks, apiUrl = DEFAULT_API_URL }) {
  const [error, setError] = useState("");
  const [busyTaskId, setBusyTaskId] = useState(null);

  // Add a newly created task to the dashboard
  function addTask(newTask) {
    if (!newTask) return;

    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);

    setError("");
  }

  // Toggle task status
  async function toggleTask(id) {
    const task = tasks.find((item) => item._id === id);

    if (!task) return;

    const newStatus =
      task.status === "Completed" ? "Pending" : "Completed";

    try {
      setError("");
      setBusyTaskId(id);

      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const updatedTask = await response.json();

      if (!response.ok) {
        throw new Error(
          updatedTask.message || "Failed to update task"
        );
      }

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item._id === id ? updatedTask : item
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setError(err.message || "Could not update task");
    } finally {
      setBusyTaskId(null);
    }
  }

  // Delete a task
  async function deleteTask(id) {
    try {
      setError("");
      setBusyTaskId(id);

      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });

      const deletedTask = await response.json();

      if (!response.ok) {
        throw new Error(
          deletedTask.message || "Failed to delete task"
        );
      }

      setTasks((previousTasks) =>
        previousTasks.filter(
          (item) => item._id !== deletedTask._id
        )
      );
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message || "Could not delete task");
    } finally {
      setBusyTaskId(null);
    }
  }

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <main>
      <div className="stats-container">
        <StatCard
          title="Total Tasks"
          value={tasks.length}
        />

        <StatCard
          title="Completed"
          value={completedCount}
        />

        <StatCard
          title="Pending"
          value={pendingCount}
        />
      </div>

      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}

      <AddTask onAddTask={addTask} />

      <h2>Recent Tasks</h2>

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p>No tasks yet. Add your first task!</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              onToggle={() => toggleTask(task._id)}
              onDelete={() => deleteTask(task._id)}
              disabled={busyTaskId === task._id}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default Dashboard;