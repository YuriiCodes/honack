import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";
import { TaskType } from "@honack/util-shared-types";
import { useEffect } from "react";

interface DroppableAreaProps {
  id: string;
  title: string;
  tasks: TaskType[];

}

const DroppableArea = ({ tasks, title,id }: DroppableAreaProps) => {
  useEffect(() => {
    setInterval(() => {
      console.log("Droppable with ID: " + id + " is updated")
      console.log(tasks)
    }, 1000)
  }, [])
  return (
    <div className={"bg-yellow-300 h-9"}>
      <h1 className="text-4xl font-bold">{title}</h1>
      <Droppable droppableId={id} >
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => {
              return (
                <Draggable draggableId={task.id.toString()} index={task.id} key={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      <TaskCard title={task.title} description={task.description}
                                assignedTo={task.executorId.toString()}
                                points={task.points}
                                status={task.status}
                      />
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableArea;
