import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import axios, { AxiosError } from "axios";
import IterationService from "../../api/services/IterationService";
import React from "react";
import TaskService from "../../api/services/TaskService";

const CreateIterationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(50, "Too short").max(1000, "Too long").required("Required"),
  points: Yup.number().required("Required").min(1, "Too low").max(100, "Too high"),
  creatorId: Yup.number().required("Required"),
  executorId: Yup.number().required("Required"),
});

interface CreateTaskFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTaskForm = ({ setIsModalOpen }: CreateTaskFormProps) => {
  return <h1>hello</h1>
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        projectId: -1
      }}
      validationSchema={CreateIterationSchema}
      onSubmit={async values => {
        try {
          const response = await TaskService.createTask("hello", "hello", 1, 1, 1, 1);
          if (response.status === 201) {
            enqueueSnackbar("Iteration created", { variant: "success", autoHideDuration: 2000 });
            setIsModalOpen(false);
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Iteration name</span>
            </label>
            <label className="input-group" htmlFor={"name"}>
              <span>Iteration name</span>
              <div className={"flex justify-center"}>
                <Field type="text" id="name" name={"name"} placeholder="Sprint 1"
                       className="input input-bordered" />
                {errors.name && touched.name ? (
                  <div className={"text-orange-700"}>{errors.name}</div>
                ) : null}
              </div>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Iteration description</span>
            </label>
            <label className="input-group">
              <span>Iteration description</span>
              <Field as={"textarea"} type="text" name={"description"}
                     placeholder={"Initialize the project backend"}
                     className="input input-bordered" />
              {errors.description && touched.description ?
                <div className={"text-orange-700"}>{errors.description}</div> : null}
            </label>
          </div>

          <div className="form-control mt-3">
            <button className="btn btn-outline">Create iteration</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default CreateTaskForm;
