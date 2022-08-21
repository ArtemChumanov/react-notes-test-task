import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Textarea from "../../../../components/shared/Textarea/Textarea";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import Button from "../../../../components/shared/Button/Button";
import { toggleNoteCreating } from "../../../../redux/notes/noteSlice";
import moment from "moment";
import { updateFolder } from "../../../../redux/notes/notesThunk";
import { mutableArray } from "../../../../utils/helpers";
import { IFolder, INote } from "../../../../types/types";
import Input from "../../../../components/shared/Input/Input";
import PasswordBlocker from "../../../../components/PasswordBlocker/PasswordBlocker";
import useActiveAction from "../../../../hooks/useActiveAction";
import { DateInfo, NoteFieldsWrapper, NoteTitle } from "./NoteFields.styled";

interface NoteFieldsProps {
  currentNote: INote;
  setCurrentNote: (arg: any) => void;
  fullScreen?: boolean;
}
const NoteFields: FC<NoteFieldsProps> = ({
  currentNote,
  setCurrentNote,
  fullScreen,
}) => {
  const {
    statusNotesEditing,
    currentIdFolder,
    currentIdNote,
    folders,
    statusPasswordForNoteCreating,
  } = useAppSelector((state) => state.notes);
  const [accessToNote, setAccessToNote] = useState(true);
  const dispatch = useAppDispatch();
  const { activeAction } = useActiveAction();

  useEffect(() => {
    !fullScreen && currentNote.lock && !statusNotesEditing
      ? setAccessToNote(false)
      : setAccessToNote(true);
  }, [currentNote, statusNotesEditing, fullScreen]);

  const saveNotesHandle = ({ password, lock }: INote) => {
    if (currentNote.title.length > 0) {
      const action: string =
        statusNotesEditing || statusPasswordForNoteCreating ? "edit" : "create";
      const notesInfo = {
        ...currentNote,
        id:
          currentNote.id === null
            ? 1
            : action === "edit"
            ? currentNote.id
            : currentNote.id + 1,
        time: moment().toString(),
        password:
          password && password?.length > 0 ? password : currentNote.password,
        lock: lock || currentNote.lock,
      };

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
    }
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

  return (
    <NoteFieldsWrapper active={activeAction} width={fullScreen ? 949 : 540}>
      {!accessToNote || statusPasswordForNoteCreating ? (
        <PasswordBlocker
          password={currentNote.password}
          setAccess={setAccessToNote}
          statusPasswordForNoteCreating={statusPasswordForNoteCreating}
          saveCreatePassword={saveNotesHandle}
        />
      ) : (
        <>
          <DateInfo>
            {currentNote.time.length !== 0 && (
              <span>
                Created:{" "}
                {moment(currentNote.time).format("DD MMMM YYYY, HH:mm")}
              </span>
            )}
          </DateInfo>
          {activeAction ? (
            <Input
              labelVisible={false}
              value={currentNote.title}
              type={"text"}
              name={"input"}
              onChange={onChangeName}
              styles={{ padding: [0, 0, 0, 15], margin: [10, 0, 0, 0] }}
            />
          ) : (
            <NoteTitle>{currentNote.title}</NoteTitle>
          )}

          <Textarea
            value={currentNote.text}
            onChange={onChangeText}
            disabled={!activeAction}
          />
          {activeAction && (
            <Button
              imageButton={false}
              label={"Save"}
              styles={{
                background: "#313866",
                padding: [10, 20, 10, 20],
                margin: [0, 0, 10, 0],
              }}
              onClick={saveNotesHandle}
            />
          )}
        </>
      )}
    </NoteFieldsWrapper>
  );
};

export default NoteFields;
