import { TaskStatus } from "@honack/util-shared-types";

interface TaskCardProps {
  title: string;
  description: string;
  points: number;
  assignedTo: string;
  status: TaskStatus;
}

const TaskCard = ({ title, description, points, assignedTo, status }: TaskCardProps) => {
  return (
    <div className="card bg-base-100 shadow-md  hover:shadow-xl active:shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{points}</div>
        </h2>
        <div className={"w-full break-words"}>{status} {"|"} {description}</div>
        <div className="card-actions">
          <div className="badge badge-outline">Assigned to @{assignedTo}</div>
        </div>
      </div>
    </div>
  )
};

export default TaskCard;
