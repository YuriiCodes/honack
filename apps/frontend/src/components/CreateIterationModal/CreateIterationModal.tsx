import CreateIterationForm from "../CreateIterationForm/CreateIterationForm";

interface CreateIterationModalProps {
  projectId: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateIterationModal = ({projectId, isModalOpen, setIsModalOpen}: CreateIterationModalProps) => {
  return (
      <div>
        <label htmlFor="my-modal-3" className="btn w-full" onClick={() => {
          setIsModalOpen(true);
        }}>Create new iteration</label>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle"  checked={isModalOpen}/>
        <div className="modal">
          <div className="modal-box relative">
            <label onClick={() => {
              setIsModalOpen(false);
            }} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">Create a new iteration</h3>
            <CreateIterationForm projectId={projectId} setIsModalOpen={setIsModalOpen}/>
          </div>
        </div>
      </div>
  )
}

export default CreateIterationModal;
