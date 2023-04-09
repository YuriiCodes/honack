import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { SetStateAction, useEffect, useState } from "react";
import { TaskStatus, TaskType } from "@honack/util-shared-types";
import TaskCard from "../TaskCard/TaskCard";
import CreateTaskModal from "../CreateTaskForm/CreateTaskModal";
import { useTaskStore } from "../../stores/TaskStore";
import TaskService from "../../api/services/TaskService";
const mapColumnNameToTaskStatus = (columnName: string): TaskStatus => {
  switch (columnName) {
    case "To Do":
      return TaskStatus.TODO;
    case "In Progress":
      return TaskStatus.IN_PROGRESS;
    case "Done":
      return TaskStatus.DONE;
    default:
      return TaskStatus.TODO;
  }
};

const onDragEnd = (result: DropResult,
                   columns: any,
                   setColumns: any,
                   tasks: TaskType[],
                   setTasks: (tasks: TaskType[]) => void) => {
  if (!result.destination) return;
  const { source, destination, draggableId } = result;

  const movedTask = tasks.find(task => task.id === Number(draggableId));
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });


    const newStatus = mapColumnNameToTaskStatus(columns[destination.droppableId].name);
    // call api update so that the column will be updated with the proper status.
    if (!movedTask) return;
    TaskService.updateTask({
      ...movedTask,
      status: newStatus
    }).then(r => {
      if (r.status === 200) {
        // update the status of the task in the store
        const updatedTasks = tasks.map(task => {
          if (task.id === movedTask.id) {
            return {
              ...task,
              status: newStatus
            };
          }
          return task;
        })
        setTasks(updatedTasks);
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};


type BoardProps = {
  isCreateTaskModalOpen: boolean
  setIsCreateTaskModalOpen: React.Dispatch<SetStateAction<boolean>>
}
const Board = ({ isCreateTaskModalOpen, setIsCreateTaskModalOpen }: BoardProps) => {
    const tasks = useTaskStore(state => state.tasks);
    const setTasks = useTaskStore(state => state.setTasks);

    const columnsFromBackend = {
      [uuidv4()]: {
        name: "To Do",
        items: tasks.filter(task => task.status === TaskStatus.TODO),
      },
      [uuidv4()]: {
        name: "In Progress",
        items: tasks.filter(task => task.status === TaskStatus.IN_PROGRESS),
      },
      [uuidv4()]: {
        name: "Done",
        items: tasks.filter(task => task.status === TaskStatus.DONE),
      }
    };

    const [columns, setColumns] = useState(columnsFromBackend);

    useEffect(() => {
      setColumns(columnsFromBackend);
    }, [tasks]);

    return (
      <div className="w-full h-full flex justify-center">
        <DragDropContext onDragEnd={(result, provided) => {
          onDragEnd(result, columns, setColumns, tasks, setTasks);
        }}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div className={"h-2/3"}>
                <h2 className={"text-xl"}>{column.name}</h2>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className={"w-96 bg-slate-400 h-full mr-3 rounded-md flex flex-col items-center"}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                              {(provided, snapshot, rubric) => {
                                return (
                                  <div className={"w-80 h-52  mt-2 rounded-md"}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       ref={provided.innerRef}>

                                    <TaskCard title={item.title} description={item.description} assignedTo={"Vasya"}
                                              points={5} status={item.status} />

                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
                {(column.name === "To Do") && <CreateTaskModal isCreateTaskModalOpen={isCreateTaskModalOpen}
                                                               setIsCreateTaskModalOpen={setIsCreateTaskModalOpen} />}
              </div>
            );
          })}
        </DragDropContext>
      </div>
    )
      ;
  }
;

export default Board;
