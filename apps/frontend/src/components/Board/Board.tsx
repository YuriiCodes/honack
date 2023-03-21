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
    id: 2,
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

const Board = () => {
  const setTasks = useTaskStore((state) => state.setTasks);
  const tasks = useTaskStore((state) => state.tasks);

  const [toDoTasks, setToDoTasks] = useState<TaskType[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<TaskType[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    setTasks(todoDummy);
    setToDoTasks(todoDummy);
    setInProgressTasks(inProgressDummy);
    setDoneTasks(doneDummy);

    // const todo = tasks.filter((task) => task.status === TaskStatus.TODO);
    // setToDoTasks(todo);
    //
    // const inProgress = tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS);
    // setInProgressTasks(inProgress);
    //
    // const done = tasks.filter((task) => task.status === TaskStatus.DONE);
    // setDoneTasks(done);

  }, []);
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
        case "Todo":
          sourceTasks = toDoTasks;
          break;
        case "In progress":
          sourceTasks = inProgressTasks;
          break;
        case "Done":
          sourceTasks = doneTasks;
          break;
        default:
          sourceTasks = [];
          break;
      }
      switch (destColumn) {
        case "Todo":
          destTasks = toDoTasks;
          break;
        case "In progress":
          destTasks = inProgressTasks;
          break;
        case "Done":
          destTasks = doneTasks;
          break;
        default:
          destTasks = [];
          break;

      }
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      switch (sourceColumn) {
        case "Todo":
          setToDoTasks(sourceTasks);
          break;
        case "In progress":
          setInProgressTasks(sourceTasks);
          break;
        case "Done":
          setDoneTasks(sourceTasks);
          break;
        default:
          break;
      }
      switch (destColumn) {
        case "Todo":
          setToDoTasks(destTasks);
          break;
        case "In progress":
          setInProgressTasks(destTasks);
          break;
        case "Done":
          setDoneTasks(destTasks);
          break;
        default:
          break;
      }

    }
  };
  return (
    <div className="flex w-full h-full">
      <DragDropContext onDragEnd={handleDragEnd}>

        <DroppableArea title={"Todo"} tasks={toDoTasks} />
        <DroppableArea title={"In progress"} tasks={inProgressTasks} />
        <DroppableArea title={"Done"} tasks={doneTasks} />
      </DragDropContext>
    </div>
  );
};

export default Board;
