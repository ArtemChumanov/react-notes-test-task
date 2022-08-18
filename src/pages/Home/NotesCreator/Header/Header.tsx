import React, { ChangeEvent, FC, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/shared/Button/Button";
// @ts-ignore
import Line from "../../../../assets/icons/Line.svg";
// @ts-ignore
import Grid from "../../../../assets/icons/grid.svg";
// @ts-ignore
import Exit from "../../../../assets/icons/exit.svg";
// @ts-ignore
import EditNotes from "../../../../assets/icons/edit-rectangle.svg";
// @ts-ignore
import WordImage from "../../../../assets/icons/word.svg";
// @ts-ignore
import SearchIcon from "../../../../assets/icons/input-search.svg";
// @ts-ignore
import Arrow from "../../../../assets/icons/arrow.svg";
// @ts-ignore
import LockImage from "../../../../assets/icons/lock.svg";
// @ts-ignore
import Delete from "../../../../assets/icons/delete.svg";
import Input from "../../../../components/shared/Input/Input";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";

const editItem = [
  { name: "Edit note", action: "edit" },
  { name: "Create note", action: "create" },
];
interface HeaderProps {
  setOpenModal: any;
}
const Header: FC<HeaderProps> = ({ setOpenModal }) => {
  const dropdownRef = useRef(null);
  const [visibleInput, setVisibleInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeLockButton, setActiveLockButton] = useState(false);
  const [activeEditButton, setActiveEditButton] = useState(false);

  const [dropdownActive, setDropdownActive] = useState(false);

  useOnClickOutside(dropdownRef, () => setDropdownActive(false), dropdownRef);

  const visibleInputHandle = () => setVisibleInput(!visibleInput);
  const onChangeInputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value.length > 0
      ? setDropdownActive(true)
      : setDropdownActive(false);
    setSearchValue(e.target.value);
  };

  const onClickLockHandle = () => setActiveLockButton(!activeLockButton);
  const onClickEditableHandle = () => setActiveEditButton(!activeEditButton);

  //useOnClickOutside(dropdownRef, () => setActiveLockButton(false), dropdownRef);
  return (
    <HeaderWrapper>
      <LeftPartStyle>
        <GroupButton>
          <Button
            imageButton={true}
            imageSrc={Line}
            styles={{ padding: [10, 10, 10, 10] }}
          />
          <Button
            imageButton={true}
            imageSrc={Grid}
            styles={{ padding: [10, 10, 10, 10] }}
          />
          <Button
            imageButton={true}
            imageSrc={Exit}
            styles={{ padding: [10, 10, 10, 10] }}
          />
        </GroupButton>
        <Button
          imageButton={true}
          imageSrc={Delete}
          styles={{ padding: [10, 10, 10, 10] }}
          onClick={setOpenModal}
        />
      </LeftPartStyle>
      {/*<CenterLine>d</CenterLine>*/}
      <RightPartStyle>
        <GroupButton>
          <RelativeContainer>
            <Button
              imageButton={true}
              imageSrc={EditNotes}
              styles={{ padding: [10, 10, 10, 10] }}
              onClick={onClickEditableHandle}
            />
            {activeEditButton && (
              <Dropdown onClickOutSide={onClickLockHandle} items={editItem} />
            )}
          </RelativeContainer>
          <RelativeContainer>
            <Button
              imageButton={true}
              imageSrc={WordImage}
              styles={{ padding: [10, 10, 10, 10] }}
            />
          </RelativeContainer>
        </GroupButton>
        <GroupButton>
          <Button
            imageButton={true}
            imageSrc={LockImage}
            onClick={onClickLockHandle}
            styles={{ padding: [10, 10, 10, 10] }}
          />
          {activeLockButton && (
            <Dropdown onClickOutSide={() => onClickLockHandle()} items={[]} />
          )}
          <Button
            imageButton={true}
            imageSrc={SearchIcon}
            onClick={visibleInputHandle}
            styles={{ padding: [10, 10, 10, 10] }}
          />
          {visibleInput && (
            <RelativeContainer>
              <Input
                type={"text"}
                name={"search"}
                label={"Search"}
                onChange={onChangeInputHandle}
              />
              {dropdownActive && (
                <Dropdown onClickOutSide={onClickLockHandle} items={[]} />
              )}
            </RelativeContainer>
          )}
        </GroupButton>
      </RightPartStyle>
    </HeaderWrapper>
  );
};

export default Header;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  //height: 72px;
  gap: 2px;
  align-items: baseline;
  box-sizing: border-box;
`;
export const LeftPartStyle = styled.div`
  width: 409px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  background: #313866;
  box-sizing: border-box;
`;
export const CenterLine = styled.div`
  //display: flex;
  width: 5px;
  height: 39px;
  color: black;
  z-index: 10;
`;
export const RightPartStyle = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  background: #313866;
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
export const RelativeContainer = styled.div`
  position: relative;
`;
