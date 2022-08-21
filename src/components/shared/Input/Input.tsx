import React from "react";
import { FormikProps } from "formik";
import styled from "styled-components";
import { iterate } from "../../../utils/helpers";
import Image from "../Image/Image";
import Flex from "../Flex/Flex";

interface InputProps<T> {
  name: string;
  label?: string;
  type: string;
  value?: string;
  formik?: FormikProps<T>;
  onChange?: (arg: any) => void;
  icon?: any;
  labelVisible: boolean;
  styles?: {
    margin?: number[];
    padding?: number[];
    width?: number;
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
  icon,
  labelVisible,
}: InputProps<T>) => {
  return (
    <Flex flexDirection={"column"} styles={{ margin: styles?.margin }}>
      {labelVisible && (
        <LabelGroup>
          <Image src={icon} styles={{ margin: [0, 10, 0, 0] }} />
          <label>{label}</label>
        </LabelGroup>
      )}
      <InputStyle
        type={type}
        name={name}
        styles={styles}
        placeholder={label}
        value={(formik?.values[name] as string) || value}
        onChange={formik?.handleChange || onChange}
      />
      {formik?.errors[name] && (
        <InputErrorMessage>{formik?.errors[name] as string}</InputErrorMessage>
      )}
    </Flex>
  );
};

export default Input;

type InputStyledProps = Pick<InputProps<unknown>, "styles">;

export const LabelGroup = styled.div`
  margin: 0 0 5px 50px;
  display: inline-block;
  align-items: center;
  label {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const InputStyle = styled.input<InputStyledProps>`
  width: 100%; /// ${({ styles }) => `${styles?.width}px`};
  height: 32px;
  padding: ${({ styles }) =>
    styles?.padding ? iterate(styles?.padding) : "0"};
  //margin: ${({ styles }) => (styles?.margin ? iterate(styles?.margin) : "0")};
  background: #1a1b1e;
  border: 1px solid #dfa549;
  border-radius: 53px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  box-sizing: border-box;
`;

export const InputErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.red};
  margin: 5px auto 0;
  display: block;
`;
