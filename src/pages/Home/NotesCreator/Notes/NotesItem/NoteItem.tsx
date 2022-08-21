import React, { FC, useMemo } from "react";
import Image from "../../../../../components/shared/Image/Image";
// @ts-ignore
import Lock from "../../../../../assets/icons/lock-color.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import moment from "moment";
import { setSelectNoteId } from "../../../../../redux/notes/noteSlice";
import { findIndexById } from "../../../../../utils/helpers";
import { INote } from "../../../../../types/types";
import Flex from "../../../../../components/shared/Flex/Flex";
import {
  ImageContainer,
  Info,
  NotesItemStyle,
  ShortDescription,
  Time,
} from "./NoteItem.styled";

interface NoteItemProps {
  note: INote;
  onSelectNote: (arg: INote) => void;
  index: number;
}
const NoteItem: FC<NoteItemProps> = ({ note, onSelectNote, index }) => {
  const dispatch = useAppDispatch();
  const { folders, currentIdFolder, currentIdNote } = useAppSelector(
    (state) => state.notes
  );
  const currentFolderIndex = useMemo(
    () => findIndexById(folders, currentIdFolder),
    [currentIdFolder, folders]
  );

  const indexNote = useMemo(
    () => findIndexById(folders[currentFolderIndex].notesList, currentIdNote),
    [currentFolderIndex, currentIdNote, folders]
  );

  const onClickNoteHandle = () => {
    dispatch(setSelectNoteId(note.id));
    onSelectNote(note);
  };

  const activeNote: boolean = index === indexNote;

  return (
    <NotesItemStyle active={activeNote} onClick={onClickNoteHandle}>
      <ImageContainer>
        {note.lock && <Image src={Lock} imageSize={[9, 11]} />}
      </ImageContainer>
      <Info>
        <h2>{note.title}</h2>
        <Flex styles={{ margin: [4, 0, 0, 0] }}>
          <Time>{moment(note.time).format("HH:mm")}</Time>
          <ShortDescription>
            {note.text.length > 36 ? note.text.slice(0, 26) + "..." : note.text}
          </ShortDescription>
        </Flex>
      </Info>
    </NotesItemStyle>
  );
};

export default NoteItem;
