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
    <div className={"flex w-full h-full mt-3"}>
      {projects.map((project) => (
        <div>
          <Link to={`/project/${project.id}`}><h1 key={project.id}>Name: {project.name}</h1> </Link>
          <div>Description: {project.description}</div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
