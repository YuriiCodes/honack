import ProjectsService from "../../api/services/ProjectsService";
import { enqueueSnackbar } from "notistack";
import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const JoinProjectSchema = Yup.object().shape({
  joinCode: Yup.string()
    .required("Required"),
});
export const JoinProjectForm = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        joinCode: "",
      }}
      validationSchema={JoinProjectSchema}
      onSubmit={async values => {
        try {
          const response = await ProjectsService.joinProject(values.joinCode);
          if (response.status === 201) {
            enqueueSnackbar("You've joined the project successfully", { variant: "success" });
            navigate("/projects");
            return;
          }

        } catch (e: unknown | AxiosError) {
          // check if this is axios error
          if (axios.isAxiosError(e)) {
            if (e.response?.status === 404) {
              enqueueSnackbar("Unknown join code", { variant: "error" });
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
              <span className="label-text">Project join code</span>
            </label>
            <label className="input-group" htmlFor={"joinCode"}>
              <span>Project join code</span>
              <div className={"flex justify-center"}>
                <Field type="text" id="joinCode" name={"joinCode"} placeholder="a2e5c2d5-a252-4f3e-a133-f5efb247401f"
                       className="input input-bordered" />
                {errors.joinCode && touched.joinCode ? (
                  <div className={"text-orange-700"}>{errors.joinCode}</div>
                ) : null}
              </div>
            </label>
          </div>

          <div className="form-control my-5">
            <button className="btn btn-primary">Join project</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
