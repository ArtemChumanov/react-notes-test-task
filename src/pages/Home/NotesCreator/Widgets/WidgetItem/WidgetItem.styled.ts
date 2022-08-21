import styled from "styled-components";

export const WidgetWindow = styled.div`
  width: 214px;
  height: 154px;
  border: 2px solid #575757;
  background: ${({ theme }) => theme.backgrounds.lightBlack};
  border-radius: 8px;
  padding: 14.5px 12.7px;
  margin-bottom: 8px;
  cursor: pointer;
`;
export const WidgetTitle = styled.h4`
  font-weight: 700;
  font-size: 6.34074px;
  line-height: 8px;
  color: #ffffff;
  margin: 0 0 2px 0;
`;

export const NotesDescription = styled.p`
  font-weight: 500;
  height: 140px;
  display: block;
  font-size: 5.54815px;
  line-height: 7px;
  color: rgba(255, 255, 255, 0.5);
  overflow-y: hidden;
  margin: 0;
  word-break: break-all;
`;
export const Title = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  margin: 0 0 4px 0;
`;
export const BlockerWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
