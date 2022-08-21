import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "../Form/Form";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { loginUser } from "../../redux/users/userThunk";
import { FormProps } from "../../types/types";

const initialValuesLogin = {
  email: "",
  password: "",
};

export type FormLogin = typeof initialValuesLogin;

const FormSchemaLogin: Yup.SchemaOf<FormLogin> = Yup.object().shape({
  email: Yup.string().email("Не коректний email").required("Обов'язкове поле"),
  password: Yup.string().required("Обов'язкове поле"),
});

const SignIn: FC<FormProps> = ({ errorMessage }) => {
  const dispatch = useAppDispatch();
  const loginHandle = ({ email, password }: FormLogin) =>
    dispatch(loginUser({ email, password }));

  const formikLogin = useFormik({
    initialValues: { ...initialValuesLogin },
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      loginHandle(values);
    },
    validationSchema: FormSchemaLogin,
  });

  return (
    <Form errorMessage={errorMessage} signUpForm={false} formik={formikLogin} />
  );
};

export default SignIn;
