import React from "react";
import { FormikProps } from "formik";
import styled from "styled-components";

interface InputProps<T> {
  name: string;
  label: string;
  type: string;
  value?: string;
  formik?: FormikProps<T>;
  onChange?: (arg: any) => void;
}

const Input = <T extends Record<string, unknown>>({
  name,
  label,
  type,
  formik,
  value,
  onChange,
}: InputProps<T>) => {
  return (
    <InputStyle
      type={type}
      name={name}
      value={(formik?.values[name] as string) || value}
      onChange={formik?.handleChange || onChange}
    />
  );
};

export default Input;
export const InputStyle = styled.input`
  width: 192px;
  height: 32px;
  background: #1a1b1e;
  border: 1px solid #dfa549;
  border-radius: 53px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  outline: none;
  padding: 0 15px;
`;
