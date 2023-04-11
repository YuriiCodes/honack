import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthService from "../api/services/AuthService";
import { enqueueSnackbar } from "notistack";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(8, "Too short").max(50, "Too long")
});


const Register = () => {
  const navigate = useNavigate();

  return (
    <div className={"container mx-auto flex justify-center h-screen"}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={async values => {
          try {
            const response = await AuthService.signUp(values.email, values.password, values.username);
            // success
            if (response.status === 201) {
              enqueueSnackbar("You've successfully registered", { variant: "success" });
              navigate("/login");
            }
          } catch (e: unknown | AxiosError) {
            // check if this is axios error
            if (axios.isAxiosError(e)) {
              if (e.response?.status === 409) {
                enqueueSnackbar("User already exists", { variant: "error" });
                return;
              }
            }
            // Unknown error
            enqueueSnackbar("Something went wrong", { variant: "error" });
            return;
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <h1 className={"m-5 text-4xl"}>Sign up</h1>
            </div>
            <div className="form-control my-5">
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

            <div className="form-control my-5">
              <label className="label">
                <span className="label-text">Your username</span>
              </label>
              <label className="input-group">
                <span>Username</span>
                <Field type="text" name={"username"} placeholder="Test user" className="input input-bordered" />
                {errors.username && touched.username ?
                  <div className={"text-orange-700"}>{errors.username}</div> : null}
              </label>
            </div>
            <div className="form-control my-5">
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
            <div className="form-control my-5">
              <button className="btn btn-primary">Sign up</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
