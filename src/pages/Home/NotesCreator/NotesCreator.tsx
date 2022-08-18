import React, { FC, useState } from "react";
import Header from "./Header/Header";
import Notes from "./Notes/Notes";
import NoteFields from "./NotesField/NoteFields";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setSelectNoteIndex } from "../../../redux/notes/noteSlice";
interface NotesCreatorProps {
  setOpenModal: any;
}
const NotesCreator: FC<NotesCreatorProps> = ({ setOpenModal }) => {
  const { folders, currentFolderIndex } = useAppSelector(
    (state) => state.notes
  );
  const dispatch = useAppDispatch();
  const [currentNote, setCurrentNote] = useState({
    title: "",
    text: "",
    time: null,
    lock: false,
  });
  const selectCurrentNoteHandle = (item: any) => {
    //dispatch(setSelectNoteIndex())
    setCurrentNote({
      title: item.title,
      text: item.text,
      lock: item.lock,
      time: null,
    });
  };

  return (
    <NotesWrapper>
      <Header setOpenModal={setOpenModal} />
      <ContentWrapper>
        <Notes
          notes={folders[currentFolderIndex].notesList}
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
