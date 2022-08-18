import React, { FC, useRef } from "react";
import styled from "styled-components";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { notesAction } from "../../redux/notes/noteSlice";
interface DropdownProps {
  onClickOutSide: any;
  items: any[];
}
const Dropdown: FC<DropdownProps> = ({ onClickOutSide, items }) => {
  const dropdownRef = useRef(null);
  const dispatch = useAppDispatch();
  useOnClickOutside(dropdownRef, onClickOutSide, null);
  const changeActionHandle = (action: string) => {
    dispatch(notesAction(action));
  };
  return (
    <DropdownWrapper ref={dropdownRef}>
      {items.map((item) => (
        <Item key={item.name} onClick={() => changeActionHandle(item.action)}>
          <span>{item.name}</span>
        </Item>
      ))}
    </DropdownWrapper>
  );
};

export default Dropdown;

export const DropdownWrapper = styled.div`
  position: absolute;
  width: 264px;
  //height: 209px;
  background: #212226;
  border: 1px solid #575757;
  border-radius: 8px;
  top: 100%;
  right: 0;
  padding: 16px;
`;
export const Item = styled.div`
  display: block;
  span {
    display: block;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    padding: 10px;
  }
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;
