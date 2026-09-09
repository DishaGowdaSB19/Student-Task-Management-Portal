import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
function Dashboard(){
    const tasks = [
        {
            id:1,
            title:"Learn React",description:"Understanding Components",status:"In Progress"
        },

        {
            id:2,
            title:"Build a Project",description:"Create a simple React app",status:"Completed"
        },

        {
            id:3,
            title:"Deploy App",description:"Host the app on a platform",status:"Pending"
        }];
    return (
        <main>
            <div className="stats-container">
                <StatCard title={"Total Task"} value={"10"}/>
                <StatCard title={"Completed"} value={"8"}/>
                <StatCard title={"Pending"} value={"2"}/>
                <StatCard title={"Time Taken"} value={"2hrs"}/>
                <StatCard title={"Name"} value={"Sharan D"} />
            </div>
            <h2>Recent Tasks</h2>
            <div className="tasks-container">
                {tasks.map((task)=>(
                    <TaskCard key={task.id} title={task.title} description={task.description} status={task.status}/>
                ))}
            </div>
            <div>

            </div>
        </main>
    );
}
export default Dashboard;

