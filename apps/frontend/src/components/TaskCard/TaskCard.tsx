interface TaskCardProps {
  title: string;
  description: string;
  points: number;
  assignedTo: string;
}
const TaskCard = ({title, description, points, assignedTo}: TaskCardProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{points}</div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Assigned to @{assignedTo}</div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard;
