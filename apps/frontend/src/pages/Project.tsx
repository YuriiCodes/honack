import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectsService from "../api/services/ProjectsService";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useAllProjectsStore } from "../stores/AllProjectsStore";
import { ProjectType, TaskType } from "@honack/util-shared-types";
import CreateIterationModal from "../components/CreateIterationModal/CreateIterationModal";
import Board from "../components/Board/Board";
import { useIterationStore } from "../stores/IterationStore";

export const Project = () => {
  const { id } = useParams();
  const getProjectById = useAllProjectsStore((state) => state.getProjectById);
  const [project, setProject] = useState<ProjectType | undefined>(undefined);
  const [tasks, setTasks] = useState<TaskType[] | undefined>(undefined);


  const setCurrentIterationId = useIterationStore((state) => state.setCurrentIterationId);

  async function getProject(id: string | undefined) {
    if (!id) return;

    // try to get project from store
    const project = getProjectById(+id);
    if (project) {
      setProject(project);
      return;
    }

    // project is not in store, try to fetch it from the api
    try {
      const response = await ProjectsService.getProjectById(id);
      if (response.status === 200) {
        setProject(response.data);
      }
    } catch (e: unknown | AxiosError) {
      // check if this is axios error
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          enqueueSnackbar("Project with given ID is not found", { variant: "error" });
          return;
        }
      }
      // Unknown error
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }

  useEffect(() => {
    getProject(id);
  }, []);

  async function fetchTasks(id: string | undefined) {
    if (!id) return;
  }

  if (!project) {
    return <div>Loading...</div>;
  }
  if (!id) {
    return <div>Project ID is not provided</div>;
  }

  return (
    <div className="w-full h-full mt-3">
      <h1 className={"text-4xl font-bold flex justify-center"}>
        {project?.name}
      </h1>
      <div className={"text-xl flex justify-center"}>
        {project?.description}
      </div>

      <div className={"flex justify-center"}>
        {(project.iterations && project.iterations.length > 0) && (
          <select className="select w-full max-w-xs"
                  onChange={(e) => {
                    setCurrentIterationId(+e.target.value);
                  }}
          >
            {project.iterations.map((iteration) => (
              <option key={iteration.id} value={iteration.id}>
                {iteration.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {(project.iterations && project.iterations.length > 0) ? (
        <Board />
      ) : (
        <div className="text-2xl flex justify-center mt-5">
          <div className={"flex flex-col"}>
            <div className={"my-2"}> No iterations found</div>
            <div className={"my-2"}> Create an iteration to start adding tasks<span
              aria-label={"pointing down emoji"}> 👇</span></div>
            <div className={"my-2"}>
              {/*TODO: add auto-state update & modal close when the iteration is created */}
              <CreateIterationModal projectId={+id} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
