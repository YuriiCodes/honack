import { useAuthStore } from "../stores/AuthStore";
import { Field, Form, Formik } from "formik";
import AuthService from "../api/services/AuthService";
import { enqueueSnackbar } from "notistack";

import * as Yup from "yup";
import axios, { AxiosError } from "axios";


const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(8, "Too short").max(50, "Too long")
});

const Login = () => {
  const login = useAuthStore((state) => state.login);
  return (
    <div className={"container mx-auto flex justify-center h-screen"}>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={LoginSchema}
        onSubmit={async values => {
          try {
            const response = await AuthService.login(values.email, values.password);
            // success
            if (response.status === 200) {
              enqueueSnackbar("You've successfully logged in", { variant: "success" });
              login(AuthService.parseJwt(response.data.access_token));
              return;
            }
          } catch (e: unknown | AxiosError) {
            if (axios.isAxiosError(e)) {
              if (e.response?.status === 401) {
                enqueueSnackbar("Invalid credentials", { variant: "error" });
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <label className="input-group" htmlFor={"email"}>
                <span>Email</span>
                <div className={"flex justify-center"}>
                  <Field type="text" id="email" name={"email"} placeholder="info@site.com"
                         className="input input-bordered" />
                  {errors.email && touched.email ? (
                    <div className={"text-orange-700"}>{errors.email}</div>
                  ) : null}
                </div>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your password</span>
              </label>
              <label className="input-group" htmlFor={"password"}>
                <span>password</span>
                <div className={"flex justify-center"}>
                  <Field type="password" id="password" name="password" className="input input-bordered" />
                  {errors.password && touched.password ? (
                    <div className={"text-orange-700"}>{errors.password}</div>
                  ) : null}
                </div>
              </label>
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-outline" type={"submit"}>Log in</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
