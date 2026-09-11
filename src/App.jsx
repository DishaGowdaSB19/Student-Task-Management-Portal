import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import DashBoard from "./components/DashBoard";
import Tasks from "./components/Tasks";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;