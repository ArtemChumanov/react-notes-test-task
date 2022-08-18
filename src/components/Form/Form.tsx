import React from "react";
import { FormikProps } from "formik";
import Input from "../shared/Input/Input";
import Button from "../shared/Button/Button";

interface FormProps<T> {
  signUpForm: boolean;
  formik?: FormikProps<T>;
}

const Form = <T extends Record<string, unknown>>({
  formik,
  signUpForm,
}: FormProps<T>) => {
  return (
    <form onSubmit={formik?.handleSubmit}>
      {signUpForm && (
        <Input
          type={"text"}
          formik={formik}
          name={"username"}
          label={"Username"}
        />
      )}
      <Input type={"text"} formik={formik} name={"email"} label={"Email"} />
      <Input
        type={"password"}
        formik={formik}
        name={"password"}
        label={"Password"}
      />
      {signUpForm && (
        <Input
          type={"password"}
          formik={formik}
          name={"confirmPassword"}
          label={"confirm password"}
        />
      )}
      <Button label={"Sign In"} type={"submit"} imageButton={false} />
    </form>
  );
};

export default Form;
