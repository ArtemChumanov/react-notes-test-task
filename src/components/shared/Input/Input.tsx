import React from "react";
import { FormikProps } from "formik";
import styled from "styled-components";
import { iterate } from "../../../utils/helpers";
import Image from "../Image/Image";

interface InputProps<T> {
  name: string;
  label: string;
  type: string;
  value?: string;
  formik?: FormikProps<T>;
  onChange?: (arg: any) => void;
  styles?: {
    margin?: number[];
    padding?: number[];
  };
}

const Input = <T extends Record<string, unknown>>({
  name,
  label,
  type,
  formik,
  value,
  onChange,
  styles,
}: InputProps<T>) => {
  return (
    <InputGroup>
      <LabelGroup>
        {/*<Image/>*/}
        <label>{label}</label>
      </LabelGroup>
      <InputStyle
        type={type}
        name={name}
        styles={styles}
        value={(formik?.values[name] as string) || value}
        onChange={formik?.handleChange || onChange}
      />
    </InputGroup>
  );
};

export default Input;

type InputStyledProps = Pick<InputProps<unknown>, "styles">;
export const InputGroup = styled.div``;
export const LabelGroup = styled.div`
  display: flex;
  label {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
  }
`;

export const InputStyle = styled.input<InputStyledProps>`
  width: 192px;
  height: 32px;
  padding: ${({ styles }) =>
    styles?.padding ? iterate(styles?.padding) : "0"};
  margin: ${({ styles }) => (styles?.margin ? iterate(styles?.margin) : "0")};
  background: #1a1b1e;
  border: 1px solid #dfa549;
  border-radius: 53px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  outline: none;
`;
