import TaskCard from "../components/TaskCard/TaskCard";

const Home = () => {
    return (
      <div className="flex w-full h-full">
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">I am team owner</div>
        <div className="divider divider-horizontal">OR</div>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">I am team member</div>
        <TaskCard title={"test task"} description={"test description"} assignedTo={"Vasya"} points={5}/>
      </div>
    )
}
export default Home
