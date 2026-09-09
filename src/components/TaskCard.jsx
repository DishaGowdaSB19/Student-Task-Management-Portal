function TaskCard({title, description, status}) {
    return (
        <div className="task-card">
            <h3>{title}</h3>
            <p>{description}</p>

            <p> {status}</p>
        </div>
    );
}

export default TaskCard;