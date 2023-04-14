import { Field, Form, Formik } from "formik";
import AuthService from "../api/services/AuthService";
import { enqueueSnackbar } from "notistack";

import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";


const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required")
});

const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className={"container mx-auto flex justify-center items-center h-screen"}>
      <Formik
        initialValues={{
          email: ""
        }}
        validationSchema={ForgetPasswordSchema}
        onSubmit={async values => {
          try {
            const response = await AuthService.resetPassword(values.email);
            // success
            if (response.status === 201) {
              enqueueSnackbar(`We've sent email to ${values.email}`, { variant: "success" });

              navigate("/login");

              return;
            }
          } catch (e: unknown | AxiosError) {
            if (axios.isAxiosError(e)) {
              if (e.response?.status === 409) {
                enqueueSnackbar("Invalid email", { variant: "error" });
                return;
              }
            }
            enqueueSnackbar("Something went wrong", { variant: "error" });
            return;
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <h1 className={"mt-10 text-4xl"}>Reset password</h1>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <label className="input-group" htmlFor={"email"}>
                <span>Email</span>
                <div className={"flex justify-center w-full"}>
                  <Field type="text" id="email" name={"email"} placeholder="info@site.com"
                         className="input input-bordered w-full" />
                  {errors.email && touched.email ? (
                    <div className={"text-orange-700"}>{errors.email}</div>
                  ) : null}
                </div>
              </label>
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary" type={"submit"}>Reset password</button>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  );
};

export default ResetPassword;
