import TaskCard from "../components/TaskCard/TaskCard";

const Home = () => {
    return (
      <div>
        <TaskCard title={"test task"} description={"test description"} assignedTo={"Vasya"} points={5}/>
      </div>
    )
}
export default Home
