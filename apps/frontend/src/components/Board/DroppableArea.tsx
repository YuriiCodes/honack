import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";
import { TaskType } from "@honack/util-shared-types";

interface DroppableAreaProps {
  title: string;
  tasks: TaskType[];

}

const DroppableArea = ({ tasks, title }: DroppableAreaProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">{title}</h1>
      <Droppable droppableId={title}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => {
              return (
                <Draggable draggableId={task.title} index={index} key={index}>
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
