import React, { FC } from "react";
import Image from "../Image/Image";
import styled from "styled-components";
import { iterate } from "../../../utils/helpers";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label?: string;
  onClick?: (arg: any) => void;
  imageButton: boolean;
  imageSrc?: any;
  imageSize?: number[];
  styles?: {
    margin?: number[] | any[];
    padding?: number[];
    background?: string;
    width?: number;
    height?: number;
  };
}

const Button: FC<ButtonProps> = ({
  type = "button",
  label,
  onClick,
  imageButton,
  imageSrc,
  imageSize,
  styles,
}) => {
  return (
    <ButtonStyle
      type={type}
      onClick={onClick}
      imageButton={imageButton}
      styles={styles}
    >
      {!imageButton ? (
        label
      ) : (
        <Image src={imageSrc} imageButton={imageButton} imageSize={imageSize} />
      )}
    </ButtonStyle>
  );
};

export default Button;
type ButtonPropsStyle = Pick<ButtonProps, "imageButton" | "styles">;

export const ButtonStyle = styled.button<ButtonPropsStyle>`
  background: ${({ styles }) =>
    styles?.background ? styles?.background : "transparent"};
  padding: ${({ styles }) =>
    styles?.padding ? iterate(styles?.padding) : "0"};
  margin: ${({ styles }) => (styles?.margin ? iterate(styles?.margin) : "0")};
  width: ${({ styles }) => (styles?.width ? `${styles?.width}px` : "auto")};
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${({ imageButton }) => imageButton && "rgba(0, 0, 0, 0.2)"};
    opacity: ${({ imageButton }) => (!imageButton ? 0.8 : 1)};
  }
  //display: flex;
  //align-items: center;
`;
