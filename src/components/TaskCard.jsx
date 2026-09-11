function TaskCard(props) {
    return (
        <div className="task-card">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>Status: {props.status}</p>
            <button onClick={props.onToggle}>
                Change Status
            </button>

            <button onClick={props.ondelete}>
                Delete Task
            </button>
            <button onClick={()=>{
                const updatedTask = {
                    ...props,
                    title: prompt("Enter new title", props.title),
                    description: prompt("Enter new description", props.description),
                    status: prompt("Enter new status (Pending/Completed)", props.status)
                };
                props.onsave(updatedTask);
            }}>
                Edit Task
            </button>
        </div>
    );
}

export default TaskCard;
