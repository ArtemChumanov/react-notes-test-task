import React, { ChangeEvent, FC, useEffect, useState } from "react";
// @ts-ignore
import BigLockImage from "../../assets/icons/lock-big.svg";
import Image from "../../components/shared/Image/Image";
import Input from "../shared/Input/Input";
import Button from "../shared/Button/Button";
import { _darkBlue } from "../../utils/constants";
import { Description, PasswordBlockerWrapper } from "./PasswordBlocker.styled";

interface PasswordBlockerProps {
  password: string;
  setAccess: (arg: any) => void;
  statusPasswordForNoteCreating: boolean;
  saveCreatePassword: (arg?: any, arg2?: any) => void;
}

const PasswordBlocker: FC<PasswordBlockerProps> = ({
  password,
  setAccess,
  statusPasswordForNoteCreating,
  saveCreatePassword,
}) => {
  const [passwordNote, setPasswordNote] = useState("");

  useEffect(() => {
    !statusPasswordForNoteCreating && setAccess(password === passwordNote);
  }, [passwordNote, password, setAccess, statusPasswordForNoteCreating]);

  const onChangePasswordHandle = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setPasswordNote(target.value);

  const onSavePasswordHandle = () => {
    passwordNote.length > 0 &&
      saveCreatePassword({ password: passwordNote, lock: true });
  };
  return (
    <PasswordBlockerWrapper>
      <Image src={BigLockImage} imageSize={[97, 121]} />
      <h3>Password</h3>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Description>
      <Input
        labelVisible={false}
        name={"password"}
        type={"password"}
        styles={{ padding: [0, 0, 0, 16] }}
        onChange={onChangePasswordHandle}
      />
      {statusPasswordForNoteCreating && (
        <Button
          label={"CreatePassword"}
          imageButton={false}
          onClick={onSavePasswordHandle}
          styles={{
            color: "white",
            width: 180,
            background: _darkBlue,
            padding: [8, 15, 8, 15],
            margin: [10, 0, 0, 0],
          }}
        />
      )}
    </PasswordBlockerWrapper>
  );
};

export default PasswordBlocker;
