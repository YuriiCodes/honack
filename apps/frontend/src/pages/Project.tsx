import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProjectsService from "../api/services/ProjectsService";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

export const Project = () => {
  const { id } = useParams();

  async function getProject(id: string | undefined) {
    if (!id) return;
    try {
      const response = await ProjectsService.getProjectById(id);
      if (response.status === 200) {
        enqueueSnackbar("Project found", { variant: "success" });
        return;
      }

    } catch(e: unknown | AxiosError) {
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
  }, [])

  return (
    <div className="flex w-full h-full mt-3">
      <h1>
        project {id}
      </h1>
    </div>
  );
};
