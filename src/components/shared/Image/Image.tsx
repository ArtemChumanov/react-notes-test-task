import React, { FC } from "react";
import styled from "styled-components";
interface ImageProps {
  src: any;
  imageSize?: number[];
  imageButton?: any;
}

const Image: FC<ImageProps> = ({ src, imageButton, imageSize }) => {
  return (
    <ImageStyle
      src={src}
      alt={"img"}
      imageButton={imageButton}
      imageSize={imageSize}
    />
  );
};

export default Image;

type ImagePropsStyle = Omit<ImageProps, "src">;
export const ImageStyle = styled.img<ImagePropsStyle>`
  width: ${({ imageSize }) => (imageSize ? `${imageSize[0]}px` : "auto")};
  height: ${({ imageSize }) => (imageSize ? `${imageSize[1]}px` : "auto")};
  background: ${({ imageButton }) => imageButton && "transparent"};
`;
