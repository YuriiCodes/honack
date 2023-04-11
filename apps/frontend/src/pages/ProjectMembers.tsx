import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProjectsService from "../api/services/ProjectsService";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useAllProjectsStore } from "../stores/AllProjectsStore";
import { DomainUserWithSalary, ProjectType } from "@honack/util-shared-types";
import ShareJoinCode from "../components/ShareJoinCode/ShareJoinCode";


export const ProjectMembers = () => {
  const getProjectById = useAllProjectsStore((state) => state.getProjectById);

  const { id } = useParams();

  const [project, setProject] = useState<ProjectType | undefined>(undefined);
  const [projectMembers, setProjectMembers] = useState<DomainUserWithSalary[]>([]);
  const [numOfDays, setNumOfDays] = useState<number>(30);

  async function getProject(id: string | undefined) {
    if (!id) return;

    // try to get project from store
    const project = getProjectById(+id);
    if (project) {
      setProject(project);
      return;
    }

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

  async function getProjectUsers(id: string | undefined) {
    if (!id) return;
    try {
      const response = await ProjectsService.getProjectMembersWithSalaries(id, numOfDays);
      console.log(response.data);
      if (response.status === 200) {
        const users = response.data;
        setProjectMembers(users);
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


  // effect that gets the project , it's iterations and members
  useEffect(() => {
    void getProject(id);
    void getProjectUsers(id);
  }, []);

  if (!project) {
    return <div>Loading... No project</div>;
  }
  if (!id) {
    return <div>Project ID is not provided</div>;
  }

  if (!projectMembers) {
    return <div>Loading... No users</div>;
  }


  return (
    <div className="w-full h-full mt-3">
      <h1 className={"text-6xl m-5 flex justify-center"}>
        {project.name} {"members"}
      </h1>
      <div className={"text-xl flex justify-center"}>
        {project.description}
      </div>
      <div className={"flex justify-center m-5"}>


        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
            <tr>
              <th>Name</th>
              <th>Base salary</th>
              <th>Points earned in last {numOfDays}</th>
              <th>Calculated payroll</th>
            </tr>
            </thead>
            <tbody>
            {projectMembers.map(user => {
              return (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{user.username}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {"$"}{user.salary}
                  </td>
                  <td>{user.points}</td>
                  <td>
                    {"$"}{user.expectedSalary}
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>

      </div>

      <hr />
      <div className={"my-5"}>
        <h2 className={"text-xl"}>Sharable code to join the project:</h2>
        <ShareJoinCode joinCode={project?.joinCode} />
      </div>
    </div>
  );
};
