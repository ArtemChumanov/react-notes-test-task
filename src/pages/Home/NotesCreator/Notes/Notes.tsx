import React, { FC } from "react";
import styled from "styled-components";
import NoteItem from "./NotesItem/NoteItem";
import { INote } from "../../../../types/types";

interface NotesProps {
  notes: INote[];
  onSelectNote: (arg: any) => void;
}
const Notes: FC<NotesProps> = ({ notes, onSelectNote }) => {
  return (
    <NotesWrapper>
      {notes &&
        notes?.map((note, index) => (
          <NoteItem key={note.id} onSelectNote={onSelectNote} note={note} />
        ))}
    </NotesWrapper>
  );
};

export default Notes;

const NotesWrapper = styled.div`
  width: 409px;
  background: #313866;
  padding: 4px 16px;
  box-sizing: border-box;
`;
