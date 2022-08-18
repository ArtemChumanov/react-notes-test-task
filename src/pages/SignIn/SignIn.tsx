import React, { useEffect } from "react";
import Input from "../../components/shared/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/shared/Button/Button";
import Form from "../../components/Form/Form";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setUser } from "../../redux/users/userSlice";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../config/firebase";
import firebase from "firebase/compat";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/users/userThunk";
import { useAuth } from "../../hooks/useAuth";

const initialValuesLogin = {
  email: "",
  password: "",
};

export type FormLogin = typeof initialValuesLogin;

const FormSchemaLogin: Yup.SchemaOf<FormLogin> = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    isAuth && navigate("/");
  }, [isAuth]);

  const loginHandle = ({ email, password }: FormLogin) =>
    dispatch(loginUser({ email, password }));

  const formikLogin = useFormik({
    initialValues: { ...initialValuesLogin },
    onSubmit: (values, helpers) => {
      loginHandle(values);
    },
    validationSchema: FormSchemaLogin,
  });

  return (
    <div>
      <Form signUpForm={false} formik={formikLogin} />
    </div>
  );
};

export default SignIn;
