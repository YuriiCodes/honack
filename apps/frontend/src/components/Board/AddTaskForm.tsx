import { useIterationStore } from "../../stores/IterationStore";
import { useEffect } from "react";

const AddTaskForm = () => {
  const currentIterationId = useIterationStore((state) => state.currentIterationId);

  return (
    <div onClick={() => {
      console.log(currentIterationId);}
    }>
      Add task
      {currentIterationId}
    </div>
  )
}

export default AddTaskForm
