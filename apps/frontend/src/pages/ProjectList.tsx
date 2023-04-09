import { useEffect } from "react";
import ProjectsService from "../api/services/ProjectsService";
import { useAllProjectsStore } from "../stores/AllProjectsStore";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const setProjects = useAllProjectsStore((state) => state.setProjects);
  const projects = useAllProjectsStore((state) => state.projects);
  const fetchProjects = async () => {
    try {
      const response = await ProjectsService.getProjects();
      if (response.status === 200) {
        setProjects(response.data);
      }
    } catch (e: unknown | AxiosError) {
      // check if this is axios error
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          enqueueSnackbar("Projects not found", { variant: "error" });
          return;
        }
      }
      // Unknown error
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    // Align the section to the center if there are no projects
    <div className={`flex w-full h-full m-3 justify-center ${projects.length === 0 ? "items-center" : ""}`}>
      <ul>
        <h1 className={"text-6xl mb-3"}>
          All your projects
        </h1>
        {projects.map((project) => (
          <li key={project.id}
              className={"p-4 bg-slate-600 hover:bg-slate-700 active:bg-slate-800 rounded-md shadow-md"}>
            <Link to={`/project/${project.id}`}>
              <p className={"text-xl"}>{project.name}</p>
              <div>{project.description}</div>
            </Link>
          </li>
        ))}


        <div className={"text-4xl text-center flex flex-col"}>
          {projects.length === 0 && (<span>You don't have any projects yet.</span>)}
          <Link to={"/chooseTeam"}>
            <button className={"btn mt-4 w-full"}>
              Create or join another one!
            </button>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default ProjectList;
