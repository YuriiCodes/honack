import CreateIterationForm from "../CreateIterationForm/CreateIterationForm";

interface CreateIterationModalProps {
  projectId: number;
}
const CreateIterationModal = ({projectId}: CreateIterationModalProps) => {
  return (
      <div>
        <label htmlFor="my-modal-3" className="btn">Create iteration</label>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
            <CreateIterationForm projectId={projectId}/>
          </div>
        </div>
      </div>
  )
}

export default CreateIterationModal;
