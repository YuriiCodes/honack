import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TaskStatus, TaskType } from "@honack/util-shared-types";
import { useEffect, useState } from "react";
import { useTaskStore } from "../../stores/TaskStore";
import DroppableArea from "./DroppableArea";

const todoDummy: TaskType[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 1,
    iterationId: 1,
    title: "test task",
    description: "test description",
    creatorId: 1,
    executorId: 1,
    points: 1,
    status: TaskStatus.TODO
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 2,
    iterationId: 1,
    title: "test task2",
    description: "test description2",
    creatorId: 1,
    executorId: 1,
    points: 1,
    status: TaskStatus.TODO
  }
];
const inProgressDummy: TaskType[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 222,
    iterationId: 1,
    title: "test task 3 in progress",
    description: "test description",
    creatorId: 1,
    executorId: 1,
    points: 1,
    status: TaskStatus.IN_PROGRESS
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 3,
    iterationId: 1,
    title: "test task 4 in progress",
    description: "test description2",
    creatorId: 1,
    executorId: 1,
    points: 1,
    status: TaskStatus.IN_PROGRESS
  }
];
const doneDummy: TaskType[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 4,
    iterationId: 1,
    title: "test task 5 done",
    description: "test description",
    creatorId: 1,
    executorId: 1,
    points: 1,
    status: TaskStatus.DONE

  }
];

enum BoardColumnIDs {
  TODO = "todo",
  IN_PROGRESS = "inProgress",
  DONE = "done"

}
const Board = () => {
  // const setTasks = useTaskStore((state) => state.setTasks);
  // const tasks = useTaskStore((state) => state.tasks);

  const [toDoTasks, setToDoTasks] = useState<TaskType[]>(todoDummy);
  const [inProgressTasks, setInProgressTasks] = useState<TaskType[]>(inProgressDummy);
  const [doneTasks, setDoneTasks] = useState<TaskType[]>(doneDummy);

  // useEffect(() => {
  //   // setTasks(todoDummy);
  //   setToDoTasks(todoDummy);
  //   setInProgressTasks(inProgressDummy);
  //   setDoneTasks(doneDummy);
  //
  //   // const todo = tasks.filter((task) => task.status === TaskStatus.TODO);
  //   // setToDoTasks(todo);
  //   //
  //   // const inProgress = tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS);
  //   // setInProgressTasks(inProgress);
  //   //
  //   // const done = tasks.filter((task) => task.status === TaskStatus.DONE);
  //   // setDoneTasks(done);
  //
  // }, []);
  const handleDragEnd = (res: DropResult) => {
    console.log(res);
    if (!res.destination) return;
    const { source, destination } = res;
    // handle card movement from one column to another
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = source.droppableId;
      const destColumn = destination.droppableId;
      let sourceTasks: TaskType[];
      let destTasks: TaskType[];
      switch (sourceColumn) {
        case BoardColumnIDs.TODO:
          sourceTasks = toDoTasks;
          break;
        case BoardColumnIDs.IN_PROGRESS:
          sourceTasks = inProgressTasks;
          break;
        case BoardColumnIDs.DONE:
          sourceTasks = doneTasks;
          break;
        default:
          sourceTasks = [];
          break;
      }
      switch (destColumn) {
        case BoardColumnIDs.TODO:
          destTasks = toDoTasks;
          break;
        case BoardColumnIDs.IN_PROGRESS:
          destTasks = inProgressTasks;
          break;
        case BoardColumnIDs.DONE:
          destTasks = doneTasks;
          break;
        default:
          destTasks = [];
          break;

      }
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      switch (sourceColumn) {
        case BoardColumnIDs.TODO:
          setToDoTasks(sourceTasks);
          break;
        case BoardColumnIDs.IN_PROGRESS:
          setInProgressTasks(sourceTasks);
          break;
        case BoardColumnIDs.DONE:
          setDoneTasks(sourceTasks);
          break;
        default:
          break;
      }
      switch (destColumn) {
        case BoardColumnIDs.TODO:
          setToDoTasks(destTasks);
          break;
        case BoardColumnIDs.IN_PROGRESS:
          setInProgressTasks(destTasks);
          break;
        case BoardColumnIDs.DONE:
          setDoneTasks(destTasks);
          break;
        default:
          break;
      }

    }
  };
  useEffect(() => {
    setInterval(() => {
      console.log("todoTasksIN Board", toDoTasks);
    }, 1000)
  }, [])
  return (
    <div className="flex w-full h-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <DroppableArea title={"Todo"} tasks={toDoTasks} id={BoardColumnIDs.TODO}/>
        {/*<DroppableArea title={"In progress"} tasks={inProgressTasks} id={BoardColumnIDs.IN_PROGRESS} />*/}
        {/*<DroppableArea title={"Done"} tasks={doneTasks} id={BoardColumnIDs.DONE}/>*/}
      </DragDropContext>
    </div>
  );
};

export default Board;
