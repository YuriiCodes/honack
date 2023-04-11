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
    <div className="card bg-slate-800 shadow-xl w-full">
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

  // return (
  //   <figure
  //     className="mb-72 flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
  //     <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
  //       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Very easy this was to integrate</h3>
  //       <p className="my-4">If you care for your time, I hands down would go with this."</p>
  //     </blockquote>
  //     <figcaption className="flex items-center justify-center space-x-3">
  //       <div className="space-y-0.5 font-medium dark:text-white text-left">
  //         <div>Bonnie Green</div>
  //         <div className="text-sm text-gray-500 dark:text-gray-400">Developer at Open AI</div>
  //       </div>
  //     </figcaption>
  //   </figure>
  // );
};

export default TaskCard;
