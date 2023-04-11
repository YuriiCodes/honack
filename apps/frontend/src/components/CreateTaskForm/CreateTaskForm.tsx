import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import axios, { AxiosError } from "axios";
import React from "react";
import TaskService from "../../api/services/TaskService";
import { useAllProjectsStore } from "../../stores/AllProjectsStore";
import { useIterationStore } from "../../stores/IterationStore";
import ShareJoinCode from "../ShareJoinCode/ShareJoinCode";

const CreateTaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(50, "Too short").max(1000, "Too long").required("Required"),
  points: Yup.number().required("Required").min(1, "Too low").max(100, "Too high"),
  executorId: Yup.number().required("Required").positive("Please select the valid executor")
});

interface CreateTaskFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTaskForm = ({ setIsModalOpen }: CreateTaskFormProps) => {
  const currentProjectId = useAllProjectsStore((state) => state.currentProjectId);
  const getProjectUsersByProjectId = useAllProjectsStore((state) => state.getProjectUsersByProjectId);
  const currentIterationId = useIterationStore((state) => state.currentIterationId);
  const getProjectById = useAllProjectsStore((state) => state.getProjectById);
  const [shouldShowJoinProjectCode, setShouldShowJoinProjectCode] = React.useState(false);

  if (!currentProjectId) return <div>Something went wrong</div>;

  const project = getProjectById(currentProjectId);
  if (!project) return <div>Something went wrong</div>;

  if (!currentProjectId) {
    return <div>No project ID, something went wrong...</div>;
  }
  const projectUsers = getProjectUsersByProjectId(currentProjectId);
  if (!projectUsers) {
    return <div>No project users, something went wrong...</div>;
  }

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        points: 1,
        executorId: -1
      }}
      validationSchema={CreateTaskSchema}
      onSubmit={async values => {
        try {
          if (!currentIterationId || !currentProjectId) {
            return;
          }
          const response = await TaskService.createTask(values.title, values.description, values.points, Number(values.executorId), currentIterationId, currentProjectId);
          if (response.status === 201) {
            enqueueSnackbar("Task created", { variant: "success", autoHideDuration: 2000 });
            setIsModalOpen(false);
            //clear form
            values.title = "";
            values.description = "";
            values.points = 1;
            values.executorId = -1;

            return;
          }
        } catch (e: unknown | AxiosError) {
          // check if this is axios error
          if (axios.isAxiosError(e)) {
            if (e.response?.status === 409) {
              enqueueSnackbar("Iteration name already exists", { variant: "error" });
              return;
            }
          }
          // Unknown error
          enqueueSnackbar("Something went wrong", { variant: "error" });
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-control my-5">
            <label className="label">
              <span className="label-text">Task name</span>
            </label>
            <label className="input-group" htmlFor={"title"}>
              <span>Name</span>
              <div className={"flex justify-center w-full"}>
                <Field type="text" id="title" name={"title"} placeholder="Task 1"
                       className="input input-bordered w-full" />
                {errors.title && touched.title ? (
                  <div className={"text-orange-700"}>{errors.title}</div>
                ) : null}
              </div>
            </label>
          </div>

          <div className="form-control my-5">
            <label className="label">
              <span className="label-text">Iteration description</span>
            </label>
            <label className="input-group">
              <span>Description</span>
              <Field as={"textarea"} type="text" name={"description"}
                     placeholder={"Initialize the project backend"}
                     className="input input-bordered w-full" />
              {errors.description && touched.description ?
                <div className={"text-orange-700"}>{errors.description}</div> : null}
            </label>
          </div>


          <div className="form-control my-5">
            <label className="label">
              <span className="label-text">Task points</span>
            </label>
            <label className="input-group">
              <span>Points</span>
              <Field type="number" name={"points"}
                     min={1}
                     max={100}
                     placeholder={"Initialize the project backend"}
                     className="input input-bordered w-full" />
              {errors.points && touched.points ?
                <div className={"text-orange-700"}>{errors.points}</div> : null}
            </label>
          </div>


          <div className="form-control my-5">
            <label className="label">
              <span className="label-text">Task executor</span>
            </label>
            <label className="input-group">
              <span>Executor</span>
              {/*Render select with all projectUsers.users Ids as option:*/}
              <Field as={"select"} name={"executorId"} className="input input-bordered w-full">
                <option value={-11}>Select executor</option>
                {projectUsers?.users.map(user => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  );
                })}
              </Field>

              {
                errors.executorId && touched.executorId ?
                  <div className={"text-orange-700"}>{errors.executorId}</div> : null
              }
            </label>

            <button className={"btn  btn-ghost w-full mt-5"} onClick={(e)  => {
              e.preventDefault();
              setShouldShowJoinProjectCode(!shouldShowJoinProjectCode);
            }}>Add new project members</button>
          </div>

          {shouldShowJoinProjectCode && (
            <div className={"my-5"}>
              <h2 className={"text-xl"}>Sharable code to join the project:</h2>
              <ShareJoinCode joinCode={project?.joinCode}/>
            </div>
          )}


          <div className="form-control my-5">
            <button className="btn btn-primary">Create task</button>
          </div>
        </Form>
      )
      }
    </Formik>
  );
};
export default CreateTaskForm;
