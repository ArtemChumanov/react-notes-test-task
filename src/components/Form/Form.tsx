import React from "react";
import { FormikProps } from "formik";
import Input from "../shared/Input/Input";
import Button from "../shared/Button/Button";
import styled from "styled-components";

interface FormProps<T> {
  signUpForm: boolean;
  formik?: FormikProps<T>;
}

const Form = <T extends Record<string, unknown>>({
  formik,
  signUpForm,
}: FormProps<T>) => {
  return (
    <FormStyle onSubmit={formik?.handleSubmit}>
      {signUpForm && (
        <Input
          type={"text"}
          formik={formik}
          name={"username"}
          label={"Username"}
          styles={{ padding: [0, 15, 0, 15], margin: [0, 0, 17, 0] }}
        />
      )}
      <Input
        type={"text"}
        formik={formik}
        name={"email"}
        label={"Email"}
        styles={{ padding: [0, 15, 0, 15], margin: [0, 0, 17, 0] }}
      />
      <Input
        type={"password"}
        formik={formik}
        name={"password"}
        label={"Password"}
        styles={{ padding: [0, 15, 0, 15], margin: [0, 0, 17, 0] }}
      />
      {signUpForm && (
        <Input
          type={"password"}
          formik={formik}
          name={"confirmPassword"}
          label={"confirm password"}
          styles={{ padding: [0, 15, 0, 15], margin: [0, 0, 17, 0] }}
        />
      )}
      <Button label={"Sign In"} type={"submit"} imageButton={false} />
    </FormStyle>
  );
};

export default Form;
export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`;
