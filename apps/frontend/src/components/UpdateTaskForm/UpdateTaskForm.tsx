import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";

import React from "react";
import TaskService from "../../api/services/TaskService";
import { useAllProjectsStore } from "../../stores/AllProjectsStore";
import { useIterationStore } from "../../stores/IterationStore";
import ShareJoinCode from "../ShareJoinCode/ShareJoinCode";
import { TaskType } from "@honack/util-shared-types";
import { useUpdateTasksStore } from "../../stores/UpdateTasksStore";

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

  item: TaskType;
}

const UpdateTaskForm = ({ setIsModalOpen, item }: CreateTaskFormProps) => {
  const currentProjectId = useAllProjectsStore((state) => state.currentProjectId);
  const getProjectUsersByProjectId = useAllProjectsStore((state) => state.getProjectUsersByProjectId);
  const currentIterationId = useIterationStore((state) => state.currentIterationId);
  const getProjectById = useAllProjectsStore((state) => state.getProjectById);

  const toggleShouldRefetchTasks = useUpdateTasksStore((state) => state.toggleShouldRefetchTasks);

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
        title: item.title,
        description: item.description,
        points: item.points,
        executorId: item.executorId,
      }}
      validationSchema={CreateTaskSchema}
      onSubmit={async values => {
        try {
          if (!currentIterationId || !currentProjectId) {
            return;
          }

          const response = await TaskService.updateTask({
            id: item.id,
            iterationId: item.iterationId,
            title: values.title,
            description: values.description,
            creatorId: item.creatorId,
            executorId: values.executorId,
            points: values.points,
            status: item.status,
          })
          if (response.status === 200) {
            toggleShouldRefetchTasks();
            enqueueSnackbar("Task updated", { variant: "success", autoHideDuration: 2000 });
            setIsModalOpen(false);

            values.title = "";
            values.description = "";
            values.points = 1;
            values.executorId = -1;

            return;
          }
        } catch (e: unknown) {
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
              <span className="label-text">Task description</span>
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
            <button className="btn btn-primary" type={"submit"}>Update task</button>
          </div>
        </Form>
      )
      }
    </Formik>
  );
};
export default UpdateTaskForm;
