import React from "react";
import styled from "styled-components";

const Flex = ({ children }: any) => {
  return <FlexWrapper>{children}</FlexWrapper>;
};

export default Flex;
const FlexWrapper = styled.div`
  display: flex;
`;
