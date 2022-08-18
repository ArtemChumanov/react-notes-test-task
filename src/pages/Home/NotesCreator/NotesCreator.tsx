import React, { FC, useMemo, useState } from "react";
import Header from "./Header/Header";
import Notes from "./Notes/Notes";
import NoteFields from "./NotesField/NoteFields";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setSelectNoteId } from "../../../redux/notes/noteSlice";
import { findIndexById } from "../../../utils/helpers";
import { INote } from "../../../types/types";

interface NotesCreatorProps {
  setOpenModal: () => void;
}
const NotesCreator: FC<NotesCreatorProps> = ({ setOpenModal }) => {
  const dispatch = useAppDispatch();
  const { folders, currentIdFolder } = useAppSelector((state) => state.notes);

  const currentFolderIndex: number = useMemo(
    () => findIndexById(folders, currentIdFolder),
    [currentIdFolder]
  );

  const [currentNote, setCurrentNote] = useState<INote>({
    title: "",
    text: "",
    time: "",
    lock: false,
    id: 0,
  });
  const selectCurrentNoteHandle = (item: INote) => {
    dispatch(setSelectNoteId(item.id));
    setCurrentNote({
      title: item.title,
      text: item.text,
      lock: item.lock,
      time: "",
      id: item.id,
    });
  };

  return (
    <NotesWrapper>
      <Header setOpenModal={setOpenModal} />
      <ContentWrapper>
        <Notes
          notes={folders[currentFolderIndex]?.notesList || []}
          onSelectNote={selectCurrentNoteHandle}
        />
        <NoteFields currentNote={currentNote} setCurrentNote={setCurrentNote} />
      </ContentWrapper>
    </NotesWrapper>
  );
};

export default NotesCreator;

const NotesWrapper = styled.div`
  //width: calc(100% - 300px);
  flex-grow: 1;
  background: black;
  border-radius: 0 30px 30px 0;
`;
const ContentWrapper = styled.div`
  display: flex;
`;
