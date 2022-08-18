import React from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useFormik } from "formik";
import Form from "../../components/Form/Form";
import * as Yup from "yup";
import { createUser } from "../../redux/users/userThunk";

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export type FormRegister = typeof initialValuesRegister;

const FormSchemaRegister: Yup.SchemaOf<FormRegister> = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().required(),
});

const SignUp = () => {
  const dispatch = useAppDispatch();

  const registerHandle = ({ email, password }: FormRegister) => {
    dispatch(createUser({ name: "", email, password }));
  };

  const formikRegister = useFormik({
    initialValues: { ...FormSchemaRegister },
    onSubmit: (values: any, helpers) => {
      registerHandle(values);
    },
    validationSchema: FormSchemaRegister,
  });

  return (
    <div>
      <Form signUpForm={true} formik={formikRegister} />
    </div>
  );
};

export default SignUp;
