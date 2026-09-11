function Tasks() {
  const tasks = [
    {
      title: "Complete React assignment",
      description: "Finish the dashboard components",
      status: "In Progress",
    },
    {
      title: "Review project documentation",
      description: "Update the project README file",
      status: "Pending",
    },
    {
      title: "Submit final project",
      description: "Prepare and submit the completed project",
      status: "Completed",
    },
  ];

  return (
    <main>
      <h2>My Tasks</h2>

      <div className="tasks-container">
        {tasks.map((task) => (
          <article className="task-card" key={task.title}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>

            <span className="task-status">{task.status}</span>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Tasks;