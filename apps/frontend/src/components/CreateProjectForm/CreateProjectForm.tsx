import { enqueueSnackbar } from "notistack";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import ProjectsService from "../../api/services/ProjectsService";
import { useNavigate } from "react-router-dom";

const CreateProjectSchema = Yup.object().shape({
  name: Yup.string()
    .min(10, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(50, "Too short").max(1000, "Too long").required("Required")
});
export const CreateProjectForm = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        name: "",
        description: ""
      }}
      validationSchema={CreateProjectSchema}
      onSubmit={async values => {
        try {
          const response = await ProjectsService.createProject(values.name, values.description);
          if (response.status === 201) {
            enqueueSnackbar("Project created", { variant: "success", autoHideDuration: 2000 });
            navigate("/projects");
            return;
          }

        } catch (e: unknown | AxiosError) {
          // check if this is axios error
          if (axios.isAxiosError(e)) {
            if (e.response?.status === 409) {
              enqueueSnackbar("Project name already exists", { variant: "error" });
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
              <span className="label-text">Project name</span>
            </label>
            <label className="input-group" htmlFor={"name"}>
              <span>Project name</span>
              <div className={"flex justify-center w-full"}>
                <Field type="text" id="name" name={"name"} placeholder="An amazing project"
                       className="input input-bordered w-full" />
                {errors.name && touched.name ? (
                  <div className={"text-orange-700"}>{errors.name}</div>
                ) : null}
              </div>
            </label>
          </div>

          <div className="form-control my-5">
            <label className="label">
              <span className="label-text">Project description</span>
            </label>
            <label className="input-group">
              <span>Project description</span>
              <Field as={"textarea"} type="text" name={"description"}
                     placeholder={"This project is unique in a way that we focus on .."}
                     className="input input-bordered" />
              {errors.description && touched.description ?
                <div className={"text-orange-700"}>{errors.description}</div> : null}
            </label>
          </div>
          <div className="form-control my-5">
            <button className="btn btn-primary">Create project</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
