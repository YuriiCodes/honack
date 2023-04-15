import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProjectsService from "../api/services/ProjectsService";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useAllProjectsStore } from "../stores/AllProjectsStore";
import { ProjectType } from "@honack/util-shared-types";
import CreateIterationModal from "../components/CreateIterationForm/CreateIterationModal";
import Board from "../components/Board/Board";
import { useIterationStore } from "../stores/IterationStore";
import TaskService from "../api/services/TaskService";
import { useTaskStore } from "../stores/TaskStore";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { useUpdateTasksStore } from "../stores/UpdateTasksStore";

export const Project = () => {
  const { id } = useParams();
  const currentProjectId = useAllProjectsStore((state) => state.currentProjectId);
  const setCurrentProjectId = useAllProjectsStore((state) => state.setCurrentProjectId);
  const addProject = useAllProjectsStore((state) => state.addProject);
  const addProjectUsers = useAllProjectsStore((state) => state.addProjectUsers);


  const currentIterationId = useIterationStore((state) => state.currentIterationId);
  const setCurrentIterationId = useIterationStore((state) => state.setCurrentIterationId);

  const shouldRefetchTasks = useUpdateTasksStore((state) => state.shouldRefetchTasks);

  const setTasks = useTaskStore(state => state.setTasks);
  const [project, setProject] = useState<ProjectType | undefined>(undefined);


  // state pieces for the 'create iteration' modal.
  // We pass isModalOpen to a dependency array of useEffect,
  // so that when it changes, we will re-fetch the project and its iterations.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);


  // effect that sets the current project id in the store
  useEffect(() => {
    if (!id) {
      return;
    }
    setCurrentProjectId(+id);
  }, []);

  async function getProject(id: string | undefined) {
    if (!id) return;

    try {
      const response = await ProjectsService.getProjectById(id);
      if (response.status === 200) {
        setProject(response.data);
        addProject(response.data);
        if (response.data.iterations && response.data.iterations.length > 0) {
          setCurrentIterationId(response.data.iterations[0].id);
        }
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

  // effect that gets the project and its iterations
  useEffect(() => {
    void getProject(id);
  }, [isModalOpen]);

  async function getProjectUsers(id: string | undefined) {
    if (!id) return;
    try {
      const response = await ProjectsService.getProjectMembers(id);
      if (response.status === 200) {
        const users = response.data;
        addProjectUsers({
          projectId: +id,
          users
        });
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

  // effect that gets all the users for the project
  useEffect(() => {
    void getProjectUsers(id);
  }, []);

  async function getTasks(projectId: number | null, iterationId: number | null) {
    if (!projectId || !iterationId) return;

    try {
      const response = await TaskService.getTasksByIterationId(iterationId);
      if (response.status === 200) {
        const tasks = response.data;
        setTasks(tasks);
      }
    } catch (e: unknown | AxiosError) {
      // check if this is axios error
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          enqueueSnackbar("Tasks for the given ID is not found", { variant: "error" });
          return;
        }
      }
      // Unknown error
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }

  // effect that gets all the tasks for the iteration,
  // when the iteration id changes or when the 'create task'
  // modal is closed => we need to re-fetch the tasks,
  // because we might have created a new one
  useEffect(() => {
    void getTasks(currentProjectId, currentIterationId);
  }, [currentIterationId, shouldRefetchTasks]);

  if (!project) {
    return <div>Loading...</div>;
  }
  if (!id) {
    return <div>Project ID is not provided</div>;
  }



  const breadcrumbs = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "All projects",
      path: "/projects"
    },
    {
      name: project.name,
      path: `/project/${project.id}`
    },
  ];
  return (
    <div className="w-full h-full mt-3">
      <div className="flex justify-center">
        <Breadcrumbs links={breadcrumbs} />
      </div>
      <h1 className={"text-6xl m-5 flex justify-center"}>
        {project?.name}
      </h1>
      <div className={"text-xl flex justify-center"}>
        {project?.description}
      </div>

      {project.iterations && project.iterations.length > 0 && (
        <div className={" flex justify-center m-5 pb-5 items-center border-b border-base-content "}>
          <span className={"mr-7 text-lg"}>Please, select the iteration:</span>
          <div className={"border-2 border-slate-400 rounded-sm mr-7"}>
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
          </div>
          <CreateIterationModal projectId={+id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <Link to={`/project/${currentProjectId}/members`} className={"border-l border-base-content ml-5 pl-5"}>
            <button className={"btn"}>
              Manage project members
            </button>
          </Link>
        </div>
      )}

      {(project.iterations && project.iterations.length > 0) ? (
        <div className={"flex justify-center m-5"}>
          <Board isCreateTaskModalOpen={isCreateTaskModalOpen}
                 setIsCreateTaskModalOpen={setIsCreateTaskModalOpen}
                 project={project}
          />
        </div>
      ) : (
        <div className="text-2xl flex justify-center mt-5">
          <div className={"flex flex-col"}>
            <div className={"mt-48 mb-2 text-6xl w-full text-bold"}>No iterations found</div>
            <div className={"my-2 w-full"}> Create an iteration to start adding tasks<span
              aria-label={"pointing down emoji"}> 👇</span></div>
            <div className={"my-2"}>
              <CreateIterationModal projectId={+id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
