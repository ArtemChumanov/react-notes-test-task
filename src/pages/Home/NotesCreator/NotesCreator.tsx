import React, { FC, useEffect, useMemo, useState } from "react";
import Header from "./Header/Header";
import Notes from "./Notes/Notes";
import NoteFields from "./NotesField/NoteFields";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setSelectNoteId } from "../../../redux/notes/noteSlice";
import { findIndexById } from "../../../utils/helpers";
import { INote } from "../../../types/types";
import { ViewType } from "../../../utils/constants";
import Widgets from "./Widgets/Widgets";

interface NotesCreatorProps {
  setOpenModal: () => void;
}
const initialState: INote = {
  title: "",
  text: "",
  time: "",
  lock: false,
  password: "",
  id: 0,
};
const NotesCreator: FC<NotesCreatorProps> = ({ setOpenModal }) => {
  const dispatch = useAppDispatch();
  const [view, setView] = useState<ViewType.LINE | ViewType.WIDGET>(
    ViewType.LINE
  );
  const { folders, currentIdFolder, currentIdNote, statusNotesCreating } =
    useAppSelector((state) => state.notes);

  const currentFolderIndex: number = useMemo(
    () => findIndexById(folders, currentIdFolder),
    [currentIdFolder, folders]
  );

  useEffect(() => {
    currentFolderIndex && folders[currentFolderIndex]?.notesList.length > 0
      ? dispatch(setSelectNoteId(folders[currentFolderIndex].notesList[0].id))
      : dispatch(setSelectNoteId(null));
  }, [currentIdFolder, dispatch, folders, currentFolderIndex]);

  const [currentNote, setCurrentNote] = useState<INote>(initialState);

  useEffect(() => {
    (currentIdNote === null || statusNotesCreating) &&
      setCurrentNote(initialState);
  }, [currentIdNote, statusNotesCreating]);

  const selectCurrentNoteHandle = (item: INote) => {
    dispatch(setSelectNoteId(item.id));
    setCurrentNote({
      title: item.title,
      text: item.text,
      lock: item.lock,
      time: item.time,
      id: item.id,
      password: item.password,
    });
  };
  const resetCurrentNoteHandle = () => {
    setCurrentNote(initialState);
  };

  return (
    <NotesWrapper>
      <Header
        setOpenModal={setOpenModal}
        view={view}
        setView={setView}
        resetNote={resetCurrentNoteHandle}
        selectCurrentNoteHandle={selectCurrentNoteHandle}
      />
      <ContentWrapper>
        {view === ViewType.LINE ? (
          <Notes
            notes={folders[currentFolderIndex]?.notesList || []}
            onSelectNote={selectCurrentNoteHandle}
          />
        ) : (
          currentNote.id === 0 && (
            <Widgets
              onSelectNote={selectCurrentNoteHandle}
              notes={folders[currentFolderIndex]?.notesList || []}
            />
          )
        )}
        {(currentNote.id !== 0 || view === ViewType.LINE) && (
          <NoteFields
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            fullScreen={view === ViewType.WIDGET}
          />
        )}
      </ContentWrapper>
    </NotesWrapper>
  );
};

export default NotesCreator;

const NotesWrapper = styled.div`
  //flex-grow: 1;
  background: black;
  border-radius: 0 30px 30px 0;
`;
const ContentWrapper = styled.div`
  display: flex;
`;
