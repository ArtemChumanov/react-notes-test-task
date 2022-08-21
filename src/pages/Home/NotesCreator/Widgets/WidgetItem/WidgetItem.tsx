import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Flex from "../../../../../components/shared/Flex/Flex";
import { Time } from "../../Notes/NotesItem/NoteItem.styled";
import Image from "../../../../../components/shared/Image/Image";
// @ts-ignore
import Lock from "../../../../../assets/icons/lock-big.svg";
import Input from "../../../../../components/shared/Input/Input";
import { useOnClickOutside } from "../../../../../hooks/useOnClickOutside";
import { INote } from "../../../../../types/types";
import moment from "moment";
import {
  BlockerWidget,
  NotesDescription,
  Title,
  WidgetTitle,
  WidgetWindow,
} from "./WidgetItem.styled";

interface WidgetItemProps {
  onSelectNote: (arg: INote) => void;
  note: INote;
}

const WidgetItem: FC<WidgetItemProps> = ({ onSelectNote, note }) => {
  const widgetRef = useRef(null);
  const [activeInput, setActiveInput] = useState(false);
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState("");

  useOnClickOutside(widgetRef, () => setActiveInput(false));

  useEffect(() => {
    if (password.length > 0 && password === note.password) {
      onSelectNote(note);
    }
  }, [password, note, onSelectNote]);

  const visibleInputHandle = () => {
    note.lock || access
      ? (() => {
          setAccess(false);
          setActiveInput(true);
        })()
      : (() => {
          onSelectNote(note);
        })();
  };
  const onChangeInputHandle = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setPassword(target.value);

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <WidgetWindow ref={widgetRef} onClick={visibleInputHandle}>
        {!note.lock || access ? (
          <>
            <WidgetTitle>{note.title}</WidgetTitle>
            <NotesDescription>{note.text}</NotesDescription>
          </>
        ) : (
          <BlockerWidget>
            {!activeInput ? (
              <Image src={Lock} imageSize={[41, 51]} />
            ) : (
              <Input
                labelVisible={false}
                type={"password"}
                name={"password"}
                styles={{ padding: [0, 0, 0, 15] }}
                onChange={onChangeInputHandle}
              />
            )}
          </BlockerWidget>
        )}
      </WidgetWindow>
      <Title>
        {note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title}
      </Title>
      <Time>{moment(note.time).format("HH:mm")}</Time>
    </Flex>
  );
};

export default WidgetItem;
