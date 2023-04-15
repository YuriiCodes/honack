import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import React, { SetStateAction, useEffect, useState } from "react";
import { ProjectType, TaskStatus, TaskType } from "@honack/util-shared-types";
import TaskCard from "../TaskCard/TaskCard";
import CreateTaskModal from "../CreateTaskForm/CreateTaskModal";
import { useTaskStore } from "../../stores/TaskStore";
import TaskService from "../../api/services/TaskService";
import { useAllProjectsStore } from "../../stores/AllProjectsStore";
import { useAuthStore } from "../../stores/AuthStore";


enum columnNames {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

const mapColumnNameToTaskStatus = (columnName: string): TaskStatus => {
  switch (columnName) {
    case columnNames.TODO:
      return TaskStatus.TODO;
    case columnNames.IN_PROGRESS:
      return TaskStatus.IN_PROGRESS;
    case columnNames.DONE:
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
        });
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
  project: ProjectType | undefined
}
const Board = ({ isCreateTaskModalOpen, setIsCreateTaskModalOpen, project }: BoardProps) => {

    const user = useAuthStore((state) => state.user);

    const currentProjectId = useAllProjectsStore((state) => state.currentProjectId);
    const getProjectUsersByProjectId = useAllProjectsStore((state) => state.getProjectUsersByProjectId);
    const tasks = useTaskStore(state => state.tasks);
    const setTasks = useTaskStore(state => state.setTasks);

    const columnsFromBackend = {
      [uuidv4()]: {
        name: columnNames.TODO,
        items: tasks.filter(task => task.status === TaskStatus.TODO)
      },
      [uuidv4()]: {
        name: columnNames.IN_PROGRESS,
        items: tasks.filter(task => task.status === TaskStatus.IN_PROGRESS)
      },
      [uuidv4()]: {
        name: columnNames.DONE,
        items: tasks.filter(task => task.status === TaskStatus.DONE)
      }
    };

    const [columns, setColumns] = useState(columnsFromBackend);
    useEffect(() => {
      setColumns(columnsFromBackend);
    }, [tasks]);

    if (!currentProjectId) {
      return <div>No project selected, something went wrong...</div>;
    }

    const projectUsers = getProjectUsersByProjectId(currentProjectId);

    if (!projectUsers) {
      return <div>No project users, something went wrong...</div>;
    }
    if (!project) {
      return <div>No project, something went wrong...</div>;
    }

    return (
      <div className="w-full h-full flex justify-center">
        <DragDropContext onDragEnd={(result, provided) => {
          onDragEnd(result, columns, setColumns, tasks, setTasks);
        }}>
          {Object.entries(columns).map(([id, column]) => {

            const isUserProjectOwner = project.ownerId === user?.id;
            return (
              <div className={"w-96 mx-5"}>
                <h2 className={"text-2xl"}>{column.name}</h2>
                {(column.name === columnNames.TODO && isUserProjectOwner) &&
                  <CreateTaskModal isCreateTaskModalOpen={isCreateTaskModalOpen}
                                   setIsCreateTaskModalOpen={setIsCreateTaskModalOpen} />}
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className={"w-full bg-base-300 h-screen mr-3 rounded-md flex flex-col items-center"}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                              {(provided, snapshot, rubric) => {
                                //get the executor name, join on item.executorId
                                const taskExecutor = projectUsers?.users.find(user => user.id === item.executorId);
                                if (!taskExecutor) return <div>Something went wrong...</div>;

                                return (
                                  <div className={"w-80 mt-5 rounded-md"}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       ref={provided.innerRef}>

                                    <TaskCard
                                      item={item}
                                      executor={taskExecutor}
                                      shouldShowUpdateTaskModal={isUserProjectOwner}
                                    />

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
