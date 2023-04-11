import UpdateSalaryForm from "./UpdateSalaryForm";
import React from "react";


interface CreateIterationModalProps {
  userId: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  previousSalary: number;
}

const UpdateSalaryModal = ({ userId, isModalOpen, setIsModalOpen, previousSalary }: CreateIterationModalProps) => {
  return (
    <div>
      <label htmlFor="my-modal-3" className="btn btn-ghost w-5/12" onClick={() => {
        setIsModalOpen(true);
      }}>Update salary</label>


      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" checked={isModalOpen} />
      <div className="modal">
        <div className="modal-box relative">
          <label onClick={() => {
            setIsModalOpen(false);
          }} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-3xl text-center font-bold">Update user salary</h3>
          <UpdateSalaryForm previousSalary={previousSalary} userId={userId} setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
    </div>
  );
};

export default UpdateSalaryModal;
