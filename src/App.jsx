
import "./App.css";

import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/DashBoard";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";

const API_URL = "http://localhost:5050/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load tasks");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid task data received from server");
      }

      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError(err.message || "Could not connect to backend");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <Navbar />

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchTasks}>Retry</button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              tasks={tasks}
              setTasks={setTasks}
              loading={loading}
              refreshTasks={fetchTasks}
              apiUrl={API_URL}
            />
          }
        />

        <Route
          path="/tasks"
          element={
            <Tasks
              tasks={tasks}
              loading={loading}
              refreshTasks={fetchTasks}
            />
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <TaskDetails
              tasks={tasks}
              refreshTasks={fetchTasks}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;