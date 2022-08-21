import styled from "styled-components";

export const FoldersWrapper = styled.div`
  width: 273px;
  background: ${({ theme }) => `${theme.backgrounds.sidebarBackground}`};
  border-radius: 30px 0 0 30px;
  padding: 25px 5px 19px 25px;
  position: relative;
  box-sizing: border-box;
`;
export const Logo = styled.img`
  width: 141px;
  height: 19px;
`;
export const FolderList = styled.div`
  margin-top: 53px;
`;
export const FolderStyle = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ active }) =>
    active ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  padding: 11px 8px 11px 10px;
  border-radius: 8px;
  margin-bottom: 2px;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
export const FolderImage = styled.img`
  width: 20px;
  height: 18px;
  margin-right: 10px;
`;
export const Label = styled.label`
  color: ${({ theme }) => `${theme.colors.white}`};
`;
export const CountsNotes = styled.span`
  display: inline-block;
  color: ${({ theme }) => `${theme.colors.white}`};
  opacity: 0.3;
`;

export const CreateFolder = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 11px 8px 11px 10px;
  cursor: pointer;
`;
export const NewFolderTitle = styled.span`
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => `${theme.colors.white}`};
  opacity: 0.5;
`;
export const CreatingFolderWrapper = styled.div`
  position: absolute;
  bottom: 10px;
`;
