import React from "react";
import { FormikProps } from "formik";
import Input from "../shared/Input/Input";
import Button from "../shared/Button/Button";
import styled from "styled-components";
// @ts-ignore
import EmailIcon from "../../assets/icons/email.svg";
// @ts-ignore
import UserNameIcon from "../../assets/icons/username.svg";
// @ts-ignore
import PasswordIcon from "../../assets/icons/password.svg";

interface FormProps<T> {
  signUpForm: boolean;
  formik?: FormikProps<T>;
  errorMessage?: string;
}

const Form = <T extends Record<string, unknown>>({
  formik,
  signUpForm,
  errorMessage,
}: FormProps<T>) => {
  return (
    <FormStyle onSubmit={formik?.handleSubmit}>
      {signUpForm && (
        <Input
          labelVisible={true}
          icon={UserNameIcon}
          type={"text"}
          formik={formik}
          name={"username"}
          label={"Username"}
          //value={formik?.values["username"]}
          styles={{ padding: [0, 15, 0, 15], margin: [0, 0, 17, 0] }}
        />
      )}
      <Input
        labelVisible={true}
        icon={EmailIcon}
        type={"text"}
        formik={formik}
        name={"email"}
        label={"Email"}
        styles={{ padding: [0, 15, 0, 15], margin: [0, 0, 17, 0] }}
      />
      <Input
        labelVisible={true}
        icon={PasswordIcon}
        type={"password"}
        formik={formik}
        name={"password"}
        label={"Password"}
        styles={{ padding: [0, 15, 0, 15], margin: [0, 0, 17, 0] }}
      />
      {signUpForm && (
        <Input
          labelVisible={true}
          icon={PasswordIcon}
          type={"password"}
          formik={formik}
          name={"confirmPassword"}
          label={"confirm password"}
          styles={{ padding: [0, 15, 0, 15], margin: [0, 0, 17, 0] }}
        />
      )}
      {errorMessage && <ErrorMessageLabel>{errorMessage}</ErrorMessageLabel>}
      <Button
        label={!signUpForm ? "Sign In" : "Sign Up"}
        type={"submit"}
        imageButton={false}
        styles={{
          background: "#215FF6",
          padding: [8, 0, 8, 0],
          borderRadius: 34,
          margin: [12, 0, 0, 0],
          color: "white",
        }}
      />
    </FormStyle>
  );
};

export default Form;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;
export const ErrorMessageLabel = styled.label`
  color: ${({ theme }) => theme.colors.red};
  margin: 0 auto;
`;
