import { useIterationStore } from "../../stores/IterationStore";

const AddTaskForm = () => {
  const currentIterationId = useIterationStore((state) => state.currentIterationId);

  return (
    <div className={'btn'} onClick={() => {
      console.log(currentIterationId);}
    }>
      Add new task {currentIterationId}
    </div>
  )
}

export default AddTaskForm
