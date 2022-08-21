import React, { FC } from "react";
import NoteItem from "./NotesItem/NoteItem";
import { INote } from "../../../../types/types";
import { NotesWrapper } from "./Notes.styled";

interface NotesProps {
  notes: INote[];
  onSelectNote: (arg: INote) => void;
}
const Notes: FC<NotesProps> = ({ notes, onSelectNote }) => {
  return (
    <NotesWrapper>
      {notes &&
        notes?.map((note, index) => (
          <NoteItem
            key={`note-${index}`}
            index={index}
            onSelectNote={onSelectNote}
            note={note}
          />
        ))}
    </NotesWrapper>
  );
};

export default Notes;
