import React, { FC } from "react";
import styled from "styled-components";
// @ts-ignore
import Lock from "../../../assets/icons/lock-color.svg";
import NoteItem from "./NotesItem/NoteItem";
interface NotesProps {
  notes: any[];
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
