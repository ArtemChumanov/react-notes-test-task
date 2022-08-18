import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import Textarea from "../../../../components/shared/Textarea/Textarea";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import Button from "../../../../components/shared/Button/Button";
import { toggleNoteCreating } from "../../../../redux/notes/noteSlice";
import moment from "moment";
import { updateFolder } from "../../../../redux/notes/notesThunk";
import { mutableArray } from "../../../../utils/helpers";
import { IFolder, INote } from "../../../../types/types";

interface NoteFieldsProps {
  currentNote: INote;
  setCurrentNote: (arg: any) => void;
}
const NoteFields: FC<NoteFieldsProps> = ({ currentNote, setCurrentNote }) => {
  const {
    statusNotesCreating,
    statusNotesEditing,
    currentIdFolder,
    currentIdNote,
    folders,
  } = useAppSelector((state) => state.notes);

  const dispatch = useAppDispatch();

  const saveNotesHandle = () => {
    const notesInfo = {
      ...currentNote,
      id: currentNote.id === null ? 0 : currentNote.id + 1,
      time: "12:56",
    };
    const action: string = statusNotesEditing ? "edit" : "create";
    const mutableArrOfFolders = mutableArray(
      folders,
      notesInfo,
      currentIdFolder,
      currentIdNote,
      action
    );
    setCurrentNote(notesInfo);
    dispatch(
      updateFolder({
        folderId: currentIdFolder,
        currentFolder: mutableArrOfFolders.updatedItem as IFolder,
        folders: mutableArrOfFolders.updatedArray as IFolder[],
      })
    );

    dispatch(toggleNoteCreating());
  };
  const onChangeName = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setCurrentNote((props: INote) => ({
      ...props,
      title: target.value,
    }));
  const onChangeText = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setCurrentNote((props: INote) => ({
      ...props,
      text: target.value,
    }));

  const activeMode: boolean = statusNotesCreating || statusNotesEditing;

  return (
    <NoteFieldsWrapper active={activeMode}>
      <DateInfo>
        <span>
          Created: {moment(currentNote.time).format("DD MMMM YYYY, HH:mm")}
        </span>
      </DateInfo>
      {activeMode ? (
        <input onChange={onChangeName} />
      ) : (
        <NoteTitle>{currentNote.title}</NoteTitle>
      )}

      <Textarea
        value={currentNote.text}
        onChange={onChangeText}
        disabled={!activeMode}
      />
      {activeMode && (
        <Button
          imageButton={false}
          label={"Save"}
          styles={{ background: "#313866", padding: [10, 20, 10, 20] }}
          onClick={saveNotesHandle}
        />
      )}
    </NoteFieldsWrapper>
  );
};

export default NoteFields;

export const NoteFieldsWrapper = styled.div<{ active: boolean }>`
  width: 540px; //100%;;
  background: linear-gradient(180deg, #212226 13.8%, #020202 114.67%), #212226;
  padding: 16px 14px 14px 32px;
  //overflow: auto;
  border: ${({ active }) => (active ? "1px solid #dfa549" : "none")};
  ////scroll
`;
export const DateInfo = styled.div`
  width: 100%;
  text-align: center;
  span {
    display: inline-block;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`;
const NoteTitle = styled.h2`
  margin: 0 0 8px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;
