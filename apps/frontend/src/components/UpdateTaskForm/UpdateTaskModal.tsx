import React from "react";
import UpdateTaskForm from "./UpdateTaskForm";
import { TaskType } from "@honack/util-shared-types";


interface CreateIterationModalProps {
  isCreateTaskModalOpen: boolean;
  setIsCreateTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  item: TaskType;
}

const UpdateTaskModal = ({ item, isCreateTaskModalOpen, setIsCreateTaskModalOpen }: CreateIterationModalProps) => {
  return (
    <div className={"w-full"}>
      <label htmlFor="my-modal-3" className="btn btn-outline w-1/2" onClick={() => {
        setIsCreateTaskModalOpen(true);
      }}>Update</label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" checked={isCreateTaskModalOpen} />
      <div className="modal">
        <div className="modal-box relative">
          <label onClick={() => {
            setIsCreateTaskModalOpen(false);
          }} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-2xl font-bold text-center">Update the task</h3>
          <UpdateTaskForm
            item={item}
            setIsModalOpen={setIsCreateTaskModalOpen} />
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
