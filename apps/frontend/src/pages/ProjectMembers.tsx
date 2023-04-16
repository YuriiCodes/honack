import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProjectsService from "../api/services/ProjectsService";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useAllProjectsStore } from "../stores/AllProjectsStore";
import { DomainUserWithSalary, ProjectType } from "@honack/util-shared-types";
import ShareJoinCode from "../components/ShareJoinCode/ShareJoinCode";
import { useAuthStore } from "../stores/AuthStore";
import UpdateSalaryModal from "../components/UpdateSalaryForm/UpdateSalaryModal";
import { CSVLink } from "react-csv";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import BarChartGraph from "../components/BarChart/BarChart";
import SelectTimeFrame from "../components/SelectTimeFrame/SelectTimeFrame";

export const ProjectMembers = () => {
    const getProjectById = useAllProjectsStore((state) => state.getProjectById);

    const { id } = useParams();

    const [project, setProject] = useState<ProjectType | undefined>(undefined);
    const [projectMembers, setProjectMembers] = useState<DomainUserWithSalary[]>([]);
    const [numOfDays, setNumOfDays] = useState<number>(30);
    const [shouldShowJoinCode, setShouldShowJoinCode] = useState<boolean>(false);
    const [isUpdateUserSalaryModalOpen, setIsUpdateUserSalaryModalOpen] = useState<boolean>(false);
    const authorizedUser = useAuthStore((state) => state.user);

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
    }, []);

    useEffect(() => {
      void getProjectUsers(id);
    }, [isUpdateUserSalaryModalOpen, numOfDays]);

    if (!project) {
      return <div>Loading... No project</div>;
    }
    if (!id) {
      return <div>Project ID is not provided</div>;
    }

    if (!projectMembers) {
      return <div>Loading... No users</div>;
    }

    if (!authorizedUser) {
      return <div>Loading... No user</div>;
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
      {
        name: "Members",
        path: `/project/${project.id}/members`
      }
    ];
    const graphData = projectMembers.map((user) => {
      return {
        name: user.username,
        points: user.points,
        expectedSalary: user.expectedSalary,
        baseSalary: user.salary
      };
    });
    return (
      <div className="w-full h-full mt-3">
        <div className="flex justify-center">
          <Breadcrumbs links={breadcrumbs} />
        </div>
        <h1 className={"text-6xl m-5 flex justify-center"}>
          {project.name} {"members"}
        </h1>
        <div className={"text-xl flex justify-center"}>
          <span>{project.description}</span>
        </div>

        <div className={"my-5 text-xl flex justify-center"}>
          {!shouldShowJoinCode && <button className={"btn btn-ghost"} onClick={() => {
            setShouldShowJoinCode(true);
          }
          }>Show join code
          </button>}
          {shouldShowJoinCode && <div>
            <ShareJoinCode joinCode={project?.joinCode} />
            <button className={"btn btn-ghost w-full mt-5"} onClick={() => {
              setShouldShowJoinCode(false);
            }}>Hide
            </button>
          </div>
          }
        </div>

        <div className={"flex justify-center"}>
          <SelectTimeFrame setNumOfDays={setNumOfDays} />
        </div>
          <div className="overflow-x-auto w-full flex justify-center">
            <div className={"w-full flex justify-center"}>
              <table className="table w-2/3 shadow-md">
                {/* head */}
                <thead>
                <tr>
                  <th className={"text-lg"}>Name</th>
                  <th className={"text-lg"}>
                    <span>Base salary</span>
                  </th>
                  <th className={"text-lg"}>Points earned in last {numOfDays} days</th>
                  <th className={"text-lg"}>Calculated payroll</th>
                  <th className={"text-lg"}><CSVLink
                    filename={`${new Date().toLocaleDateString()}-${project.name.trim().replace(" ", "-")}-members.csv`}
                    className={"btn btn-primary"}
                    data={
                      projectMembers.map(user => {
                        return {
                          username: user.username,
                          email: user.email,
                          salary: user.salary,
                          points: user.points,
                          expectedSalary: user.expectedSalary
                        };
                      })
                    } target="_blank">Download in CSV</CSVLink>
                  </th>
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
                      {project.ownerId === authorizedUser.id ? (
                        <td>
                          {"$"}{user.salary}
                          <UpdateSalaryModal previousSalary={user.salary || 0} userId={user.id || -1}
                                             isModalOpen={isUpdateUserSalaryModalOpen}
                                             setIsModalOpen={setIsUpdateUserSalaryModalOpen} />
                        </td>
                      ) : (
                        <td>
                          {"$"}{user.salary}
                        </td>
                      )}
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

        <div className={"flex items-center justify-center  w-full h-1/2  m-5"}>
          <div className={"w-2/3 h-1/2 shadow-md"}>
            <BarChartGraph data={graphData} />
          </div>
        </div>
      </div>
    );
  }
;
