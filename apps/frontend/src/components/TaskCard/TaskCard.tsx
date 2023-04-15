import { DomainUserWithoutPassword, TaskType } from "@honack/util-shared-types";
import UpdateTaskModal from "../UpdateTaskForm/UpdateTaskModal";
import { useState } from "react";

interface TaskCardProps {
  item: TaskType;
  executor: DomainUserWithoutPassword;
  shouldShowUpdateTaskModal: boolean;
}

const TaskCard = ({  item, executor, shouldShowUpdateTaskModal }: TaskCardProps) => {
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
  return (
    <div className="card bg-base-100 shadow-md  hover:shadow-xl active:shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {item.title}
          <div className="badge badge-secondary">{item.points}</div>
        </h2>
        <div className={"w-full break-words"}>{item.status} {"|"} {item.description}</div>
        <div className="card-actions">
          <div className="badge badge-outline">Assigned to @{executor.username}</div>
          {(shouldShowUpdateTaskModal) &&<UpdateTaskModal
            item={item}
            isCreateTaskModalOpen={isUpdateTaskModalOpen}
            setIsCreateTaskModalOpen={setIsUpdateTaskModalOpen} />}
        </div>
      </div>
    </div>
  )
};

export default TaskCard;
