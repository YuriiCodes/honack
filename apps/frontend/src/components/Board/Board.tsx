import TaskCard from "../TaskCard/TaskCard";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { TaskStatus, TaskType } from "@honack/util-shared-types";

const TaskData = [
  {
    title: "test task",
    description: "test description",
    assignedTo: "Vasya",
    points: 5
  },
  {
    title: "test task2",
    description: "test description2",
    assignedTo: "Vasya2",
    points: 6
  },
  {
    title: "test task3",
    description: "test description3",
    assignedTo: "Vasya3",
    points: 7
  }
];
const dummyData: TaskType[] = [
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
    status: TaskStatus.TODO,
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
    status: TaskStatus.TODO,
  }
];
const Board = () => {
  const handleDragEnd = (res: DropResult) => {
    console.log(res);
  };
  return (
    <div className="flex flex-col w-full h-full">
      <DragDropContext onDragEnd={handleDragEnd}>

        <h1 className="text-4xl font-bold">Todo</h1>
        <Droppable droppableId="todo">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {dummyData.map((task, index) => {
                return (
                  <Draggable draggableId={task.title} index={index} key={index}>
                    {(provided) => (
                      <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <TaskCard title={task.title} description={task.description} assignedTo={task.executorId.toString()}
                                  points={task.points} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
