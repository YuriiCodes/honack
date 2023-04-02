import CreateTaskForm from "./CreateTaskForm";

interface CreateIterationModalProps {
  isCreateTaskModalOpen: boolean;
  setIsCreateTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateTaskModal = ({ isCreateTaskModalOpen, setIsCreateTaskModalOpen}: CreateIterationModalProps) => {
  return (
    <div>
      <label htmlFor="my-modal-3" className="btn w-full" onClick={() => {
        setIsCreateTaskModalOpen(true);
      }}>Create new task</label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle"  checked={isCreateTaskModalOpen}/>
      <div className="modal">
        <div className="modal-box relative">
          <label onClick={() => {
            setIsCreateTaskModalOpen(false);
          }} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Create a new task</h3>
          <CreateTaskForm setIsModalOpen={setIsCreateTaskModalOpen} />
        </div>
      </div>
    </div>
  )
}

export default CreateTaskModal;