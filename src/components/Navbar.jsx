import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Task Manager</h2>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;