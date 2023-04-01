import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TaskStatus } from "@honack/util-shared-types";
import TaskCard from "../TaskCard/TaskCard";
import AddTaskForm from "./AddTaskForm";


const itemsFromBackend = [
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" }

];
const columnsFromBackend = {
  [uuidv4()]: {
    name: "To Do",
    items: itemsFromBackend
  },
  [uuidv4()]: {
    name: "In Progress",
    items: []
  },
  [uuidv4()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;
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


const Board = () => {
    const [columns, setColumns] = useState(columnsFromBackend);
    return (
      <div className="w-full h-full flex justify-center">
        <DragDropContext onDragEnd={(result, provided) => {
          onDragEnd(result, columns, setColumns);
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
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot, rubric) => {
                                return (
                                  <div className={"w-80 h-52  mt-2 rounded-md"}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       ref={provided.innerRef}>
                                    <TaskCard title={item.content} description={item.content} assignedTo={"Vasya"}
                                              points={5} status={TaskStatus.IN_PROGRESS} />
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
                { (column.name === "To Do") && <AddTaskForm />}
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
