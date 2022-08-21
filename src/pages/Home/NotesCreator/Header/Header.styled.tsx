import styled from "styled-components";

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  box-sizing: border-box;
`;
export const LeftPartStyle = styled.div`
  width: 409px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  background: #313866;
  box-sizing: border-box;
`;
export const RightPartStyle = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  background: #313866;
  border-radius: 0 30px 0 0;
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
export const RelativeContainer = styled.div`
  position: relative;
`;
