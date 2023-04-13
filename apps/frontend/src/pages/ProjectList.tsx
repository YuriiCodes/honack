import React, { useEffect } from "react";
import ProjectsService from "../api/services/ProjectsService";
import { useAllProjectsStore } from "../stores/AllProjectsStore";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

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

  const breadcrumbs = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "All projects",
      path: "/projects"
    }
  ];
  return (
    <div className="w-full h-full mt-3">
      <div className="flex justify-center">
        <Breadcrumbs links={breadcrumbs} />
      </div>
      {/* Align the section to the center if there are no projects*/}
      <div className={`flex w-full h-full m-3 justify-center ${projects.length === 0 ? "items-center" : ""}`}>
        <ul>
          <h1 className={"text-6xl mb-3"}>
            All your projects
          </h1>
          {projects.map((project) => (
            <li key={project.id}
                className={"p-4 my-10 bg-base-100 hover:shadow-lg active:bg-base-200 border rounded-md shadow-sm"}>
              <Link to={`/project/${project.id}`}>
                <p className={"text-xl"}>{project.name}</p>
                <div>{project.description}</div>
              </Link>
            </li>
          ))}


          <div className={"text-4xl text-center flex flex-col"}>
            {projects.length === 0 && (<span>You don't have any projects yet.</span>)}
            <Link to={"/chooseTeam"}>
              <button className={"btn btn-primary w-full"}>
                Create or join another one!
              </button>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
