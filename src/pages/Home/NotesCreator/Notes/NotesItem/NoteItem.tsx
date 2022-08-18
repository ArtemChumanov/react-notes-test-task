import React, { FC } from "react";
import Image from "../../../../../components/shared/Image/Image";

// @ts-ignore
import Lock from "../../../../../assets/icons/lock-color.svg";
import styled from "styled-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import {
  setSelectFolderIndex,
  setSelectNoteIndex,
} from "../../../../../redux/notes/noteSlice";
import moment from "moment";
interface NoteItemProps {
  key: number;
  note: any;
  onSelectNote: any;
}
const NoteItem: FC<NoteItemProps> = ({ key, note, onSelectNote }) => {
  const { folders, currentFolderIndex, currentNoteIndex } = useAppSelector(
    (state) => state.notes
  );
  const indexNote = folders[currentFolderIndex].notesList.findIndex(
    (elem) => elem.id === note.id
  );

  const dispatch = useAppDispatch();
  const onClickNoteHandle = () => {
    dispatch(setSelectNoteIndex(indexNote));
    onSelectNote(note);
  };
  const activeNote = currentNoteIndex === indexNote;

  return (
    <NotesItemStyle active={activeNote} onClick={onClickNoteHandle}>
      <ImageContainer>
        {note.lock && <Image src={Lock} imageSize={[9, 11]} />}
      </ImageContainer>
      <Info>
        <h2>{note.title}</h2>
        <ShortInfo>
          <Time>{moment(note.time).format("HH:mm")}</Time>
          <ShortDescription>
            {note.text.length > 36 ? note.text.slice(0, 36) + "..." : note.text}
          </ShortDescription>
        </ShortInfo>
      </Info>
    </NotesItemStyle>
  );
};

export default NoteItem;

const NotesItemStyle = styled.div<{ active: boolean }>`
  display: flex;
  //background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px 32px 16px 10px;
  margin-bottom: 1px;
  background: ${({ active }) =>
    active ? "rgba(0, 0, 0, 0.2)" : "transparent"};
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2);
  }
`;
const ImageContainer = styled.div`
  margin-right: 10px;
  width: 9px;
`;
const Info = styled.div`
  flex-grow: 1;
  //padding: 16px 0 16px;
  h2 {
    margin: 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    color: #ffffff;
  }
`;
const ShortInfo = styled.div`
  margin-top: 4px;
`;
const Time = styled.div`
  display: inline-block;
  margin-right: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;
const ShortDescription = styled.div`
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.5);
`;
