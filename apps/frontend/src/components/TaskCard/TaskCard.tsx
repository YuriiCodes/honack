import { TaskStatus } from "@honack/util-shared-types";

interface TaskCardProps {
  title: string;
  description: string;
  points: number;
  assignedTo: string;
  status: TaskStatus.IN_PROGRESS | TaskStatus.TODO | TaskStatus.DONE;
}
const TaskCard = ({title, description, points, assignedTo, status}: TaskCardProps) => {
  return (
    <div className="card bg-slate-800 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{points}</div>
        </h2>
        <p>{status} | {description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Assigned to @{assignedTo}</div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard;
