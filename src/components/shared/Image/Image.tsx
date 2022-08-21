import React, { FC } from "react";
import styled from "styled-components";
import { iterate } from "../../../utils/helpers";
interface ImageProps {
  src: any;
  imageSize?: number[];
  imageButton?: any;
  styles?: {
    margin?: number[];
  };
}

const Image: FC<ImageProps> = ({ src, imageButton, imageSize, styles }) => {
  return (
    <ImageStyle
      src={src}
      alt={"img"}
      imageButton={imageButton}
      imageSize={imageSize}
      styles={styles}
    />
  );
};

export default Image;

type ImagePropsStyle = Omit<ImageProps, "src">;
export const ImageStyle = styled.img<ImagePropsStyle>`
  width: ${({ imageSize }) => (imageSize ? `${imageSize[0]}px` : "auto")};
  height: ${({ imageSize }) => (imageSize ? `${imageSize[1]}px` : "auto")};
  background: ${({ imageButton }) => imageButton && "transparent"};
  margin: ${({ styles }) => (styles?.margin ? iterate(styles?.margin) : "0")}; ;
`;
