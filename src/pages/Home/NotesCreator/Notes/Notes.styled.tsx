import styled from "styled-components";

export const NotesWrapper = styled.div`
  width: 409px;
  height: 503px;
  background: ${({ theme }) => `${theme.backgrounds.darkBlue}`};
  padding: 4px 16px;
  box-sizing: border-box;
  overflow: auto;
`;
