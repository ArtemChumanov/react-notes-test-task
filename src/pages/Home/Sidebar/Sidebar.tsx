import React, { ChangeEvent, useMemo, useRef, useState } from "react";
// @ts-ignore
import LogoImage from "../../../assets/icons/BT_Logo.svg";
// @ts-ignore
import Folder from "../../../assets/icons/folder.svg";
import Image from "../../../components/shared/Image/Image";
// @ts-ignore
import AddFolderImage from "../../../assets/icons/folder-add.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  setCurrentIdFolder,
  setSelectNoteId,
} from "../../../redux/notes/noteSlice";
import Button from "../../../components/shared/Button/Button";
import { addFolder } from "../../../redux/notes/notesThunk";
import { findIndexById } from "../../../utils/helpers";
import Input from "../../../components/shared/Input/Input";
import Flex from "../../../components/shared/Flex/Flex";
import { _darkBlue } from "../../../utils/constants";
import { useAuth } from "../../../hooks/useAuth";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { IFolder } from "../../../types/types";
import useActiveAction from "../../../hooks/useActiveAction";
import {
  CountsNotes,
  CreateFolder,
  CreatingFolderWrapper,
  FolderImage,
  FolderList,
  FolderStyle,
  FoldersWrapper,
  Label,
  Logo,
  NewFolderTitle,
} from "./Sidebar.styled";

const Sidebar = () => {
  const sideBarActionRef = useRef(null);
  const dispatch = useAppDispatch();
  const { uid } = useAuth();
  const { activeAction } = useActiveAction();
  const { folders, currentIdFolder } = useAppSelector((state) => state.notes);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [folderNameValue, setFolderNameValue] = useState("");
  const [activeFolder, setActiveFolder] = useState<number | null>(
    findIndexById(folders, currentIdFolder)
  );
  useOnClickOutside(sideBarActionRef, () => setCreatingFolder(false));

  useMemo(() => {
    setActiveFolder(findIndexById(folders, currentIdFolder));
  }, [currentIdFolder, folders]);

  const selectFolderHandle = (index: number, item: IFolder) => {
    dispatch(setCurrentIdFolder(item.id));
    dispatch(setSelectNoteId(null));
    setActiveFolder(index);
  };

  const toggleCreatingHandle = () => !activeAction && setCreatingFolder(true);

  const changeInputHandle = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setFolderNameValue(target.value);

  const addFolderHandle = () => {
    dispatch(
      addFolder({
        title: folderNameValue,
        lock: false,
        notesList: [],
        id: folders.length + 1,
        userId: uid as string,
      })
    );
    setFolderNameValue("");
    setCreatingFolder(false);
  };
  return (
    <FoldersWrapper>
      <Logo src={LogoImage} />
      <FolderList>
        {folders.map((folder, index) => (
          <FolderStyle
            key={folder.id}
            active={index === activeFolder}
            onClick={() => !activeAction && selectFolderHandle(index, folder)}
          >
            <div>
              <FolderImage src={Folder} />
              <Label>{folder.title}</Label>
            </div>
            <CountsNotes>{folder.notesList?.length}</CountsNotes>
          </FolderStyle>
        ))}
      </FolderList>
      <CreatingFolderWrapper ref={sideBarActionRef}>
        {creatingFolder ? (
          <Flex alignItems={"stretch"}>
            <Input
              labelVisible={false}
              name={"name"}
              type={"text"}
              label={folderNameValue.length === 0 ? "Enter name folder" : ""}
              value={folderNameValue}
              onChange={changeInputHandle}
              styles={{ padding: [0, 0, 0, 15], width: 120 }}
            />
            <Button
              imageButton={false}
              label={"ok"}
              onClick={addFolderHandle}
              styles={{ padding: [0, 10, 0, 10], background: _darkBlue }}
            />
          </Flex>
        ) : (
          // додати нову папку
          <CreateFolder onClick={toggleCreatingHandle}>
            <Image
              src={AddFolderImage}
              imageSize={[20, 18]}
              styles={{ margin: [0, 10, 0, 0] }}
            />
            <NewFolderTitle>New Folder</NewFolderTitle>
          </CreateFolder>
        )}
      </CreatingFolderWrapper>
    </FoldersWrapper>
  );
};

export default Sidebar;
