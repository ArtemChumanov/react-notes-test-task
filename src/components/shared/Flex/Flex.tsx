import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { iterate } from "../../../utils/helpers";

interface FlexProps {
  children: ReactNode;
  flexDirection?: "column" | "row";
  justifyContent?: string;
  alignItems?: string;
  styles?: {
    margin?: number[] | string[];
  };
}
const Flex: FC<FlexProps> = ({
  children,
  styles,
  flexDirection = "row",
  justifyContent = "flex-start",
  alignItems = "flex-start",
}) => {
  return (
    <FlexWrapper
      styles={styles}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </FlexWrapper>
  );
};

export default Flex;

type FlexStyleProps = Omit<FlexProps, "children">;

const FlexWrapper = styled.div<FlexStyleProps>`
  display: flex;
  margin: ${({ styles }) => (styles?.margin ? iterate(styles?.margin) : "0")};
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`;
