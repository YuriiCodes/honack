import TaskCard from "../components/TaskCard/TaskCard";
import { TaskStatus } from "@honack/util-shared-types";

const Home = () => {
    return (
      <div>
        <TaskCard title={"test task"} description={"test description"} assignedTo={"Vasya"} points={5} status={TaskStatus.IN_PROGRESS}/>
      </div>
    )
}
export default Home
