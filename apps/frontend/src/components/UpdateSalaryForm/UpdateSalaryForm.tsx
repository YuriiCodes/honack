import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import React from "react";
import SalaryService from "../../api/services/SalaryService";

const UpdateSalarySchema = Yup.object().shape({
  salary: Yup.number()
    .min(1, "Too low")
});

interface UpdateSalaryFormProps {
  userId: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  previousSalary: number;
}

const UpdateSalaryForm = ({ userId, setIsModalOpen, previousSalary }: UpdateSalaryFormProps) => {
  return (
    <Formik
      initialValues={{
        salary: previousSalary || 0,
      }}
      validationSchema={UpdateSalarySchema}
      onSubmit={async values => {
        try {
          const response = await SalaryService.updateSalary(userId, values.salary);
          if (response.status === 200) {
            enqueueSnackbar("Salary updated", { variant: "success", autoHideDuration: 2000 });
            setIsModalOpen(false);
            return;
          }
        } catch (e: unknown ) {
          // Unknown error
          enqueueSnackbar("Something went wrong", { variant: "error" });
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-control my-5">
            <label className="label">
              <span className="label-text">Salary amount</span>
            </label>
            <label className="input-group" htmlFor={"name"}>
              <span>Salary</span>
              <div className={"flex justify-center w-full"}>
                <Field type="number" id="salary" name={"salary"}
                       positive
                       className="input input-bordered w-full" />
                {errors.salary && touched.salary ? (
                  <div className={"text-orange-700"}>{errors.salary}</div>
                ) : null}
              </div>
            </label>
          </div>

          <div className="form-control mt-3">
            <button className="btn btn-primary" type={"submit"}>Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default UpdateSalaryForm;
