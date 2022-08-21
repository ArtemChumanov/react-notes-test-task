import styled from "styled-components";

export const NoteFieldsWrapper = styled.div<{
  active: boolean;
  width: string | number;
}>`
  width: ${({ width }) =>
    typeof width === "number" ? `${width}px` : `${width}`};
  height: 502px;
  background: ${({ theme }) => `${theme.backgrounds.lightBlack}`};
  padding: 0 14px 0 32px;
  display: flex;
  flex-direction: column;
  border: ${({ active }) => (active ? "1px solid #dfa549" : "none")};
  box-sizing: border-box;
`;
export const DateInfo = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  span {
    display: inline-block;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`;
export const NoteTitle = styled.h2`
  margin: 0 0 8px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => `${theme.colors.white}`};
`;
