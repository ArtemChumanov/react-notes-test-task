import styled from "styled-components";

export const NotesItemStyle = styled.div<{ active: boolean }>`
  display: flex;
  border-radius: 8px;
  padding: 16px 32px 16px 10px;
  margin-bottom: 1px;
  background: ${({ active }) =>
    active ? "rgba(0, 0, 0, 0.2)" : "transparent"};
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2);
  }
`;
export const ImageContainer = styled.div`
  margin-right: 10px;
  width: 9px;
`;
export const Info = styled.div`
  flex-grow: 1;
  //padding: 16px 0 16px;
  h2 {
    margin: 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    color: ${({ theme }) => `${theme.colors.white}`};
  }
`;

export const Time = styled.div`
  display: inline-block;
  margin-right: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => `${theme.colors.white}`};
`;
export const ShortDescription = styled.div`
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => `${theme.colors.white}`};
  opacity: 0.5;
`;
