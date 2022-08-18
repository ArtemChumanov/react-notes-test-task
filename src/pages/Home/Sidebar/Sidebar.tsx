import React, { useState } from "react";
// @ts-ignore
import LogoImage from "../../../assets/icons/BT_Logo.svg";
// @ts-ignore
import Folder from "../../../assets/icons/folder.svg";
import Image from "../../../components/shared/Image/Image";
// @ts-ignore
import AddFolderImage from "../../../assets/icons/folder-add.svg";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  setCurrentIdFolder,
  setSelectCurrentFolder,
  setSelectFolderIndex,
} from "../../../redux/notes/noteSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { folders } = useAppSelector((state) => state.notes);
  const [activeFolder, setActiveFolder] = useState<number | null>(null);
  const selectFolderHandle = (index: number, item: any) => {
    dispatch(setSelectCurrentFolder(item));
    dispatch(setSelectFolderIndex(index));
    dispatch(setCurrentIdFolder(item.id));
    setActiveFolder(index);
  };
  return (
    <FoldersWrapper>
      <Logo src={LogoImage} />
      <FolderList>
        {folders.map((folder, index) => (
          <FolderStyle
            key={folder.id}
            active={index === activeFolder}
            onClick={() => selectFolderHandle(index, folder)}
          >
            <div>
              <FolderImage src={Folder} />
              <Label>{folder.title}</Label>
            </div>
            <CountsNotes>{folder.notesList.length}</CountsNotes>
          </FolderStyle>
        ))}
      </FolderList>
      <CreateFolder>
        <Image src={AddFolderImage} imageSize={[20, 18]} />
        <NewFolderTitle>New Folder</NewFolderTitle>
      </CreateFolder>
    </FoldersWrapper>
  );
};

export default Sidebar;

const FoldersWrapper = styled.div`
  width: 273px;
  background: linear-gradient(155.72deg, #504099 17.71%, #4b4af9 119.51%);
  border-radius: 30px 0 0 30px;
  padding: 25px 16px 19px;
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
`;
export const FolderImage = styled.img`
  width: 20px;
  height: 18px;
  margin-right: 10px;
`;
export const Label = styled.label`
  color: white;
`;
export const CountsNotes = styled.span`
  display: inline-block;
  color: rgba(255, 255, 255, 0.3);
`;

export const CreateFolder = styled.div`
  display: flex;
  align-items: center;
`;
export const NewFolderTitle = styled.span`
  font-size: 12px;
  line-height: 15px;
  color: rgba(255, 255, 255, 0.5);
`;
