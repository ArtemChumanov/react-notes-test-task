import React, { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setUser } from "../../redux/users/userSlice";
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
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     debugger;
    //     console.log(userCredential);
    //     const user = userCredential.user;
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
  };

  const formikRegister = useFormik({
    initialValues: { ...FormSchemaRegister },
    onSubmit: (values, helpers) => {
      // @ts-ignore
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
