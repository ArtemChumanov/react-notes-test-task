import React, { FC } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useFormik } from "formik";
import Form from "../Form/Form";
import * as Yup from "yup";
import { createUser } from "../../redux/users/userThunk";
import { FormProps } from "../../types/types";

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export type FormRegister = typeof initialValuesRegister;

const FormSchemaRegister: Yup.SchemaOf<FormRegister> = Yup.object().shape({
  username: Yup.string().required("Обов'язкове поле"),
  email: Yup.string().email("Не коректний email").required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, "Повинно бути мінімум 6 символів")
    .required("Обов'язкове поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Паролі не однакові")
    .required("Обов'язкове поле"),
});

const SignUp: FC<FormProps> = ({ errorMessage }) => {
  const dispatch = useAppDispatch();
  const registerHandle = ({ email, password }: FormRegister) => {
    dispatch(createUser({ name: "", email, password }));
  };

  const formikRegister = useFormik({
    initialValues: { ...FormSchemaRegister },
    onSubmit: (values: any) => {
      registerHandle(values);
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: FormSchemaRegister,
  });

  return (
    <Form
      signUpForm={true}
      formik={formikRegister}
      errorMessage={errorMessage}
    />
  );
};

export default SignUp;
