import React, { FC } from "react";
import styled from "styled-components";

interface TextareaProps {
  value: string;
  disabled: boolean;
  onChange: (arg: any) => void;
}
const Textarea: FC<TextareaProps> = ({ value, onChange, disabled }) => {
  return (
    <TextareaStyled onChange={onChange} value={value} disabled={disabled} />
  );
};

export default Textarea;
const TextareaStyled = styled.textarea`
  width: 100%;
  height: 500px;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  border: none;
  outline: none;
  resize: none;
`;
