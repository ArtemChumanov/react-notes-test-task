import React, { FC, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { notesAction } from "../../redux/notes/noteSlice";
import { IEditItem, INote } from "../../types/types";
import { ViewType } from "../../utils/constants";
import { DropdownWrapper, Item, SearchItem } from "./Dropdown.styled";

interface DropdownProps {
  onClickOutSide: () => void;
  items: IEditItem[];
  searchedItems?: INote[];
  searchDropdown?: boolean;
  selectCurrentNoteHandle: (arg: INote) => void;
  changeViewHandle: (arg: any) => void;
}

const Dropdown: FC<DropdownProps> = ({
  onClickOutSide,
  items,
  searchDropdown = false,
  searchedItems,
  selectCurrentNoteHandle,
  changeViewHandle,
}) => {
  const dropdownRef = useRef(null);
  const dispatch = useAppDispatch();
  const { currentIdNote } = useAppSelector((state) => state.notes);
  useOnClickOutside(dropdownRef, onClickOutSide);

  const changeActionHandle = (action?: string) => {
    action && dispatch(notesAction(action));
    onClickOutSide();
  };

  return (
    <DropdownWrapper ref={dropdownRef}>
      {!searchDropdown
        ? items.map(
            (item) =>
              !(currentIdNote === null && item.action === "edit") && (
                <Item
                  key={item.name}
                  onClick={() => {
                    changeActionHandle(item.action);
                    item.action === "create" && changeViewHandle(ViewType.LINE);
                  }}
                >
                  <span>{item.name}</span>
                </Item>
              )
          )
        : searchedItems?.map((item) => (
            <SearchItem
              key={item.id}
              onClick={() => {
                selectCurrentNoteHandle(item);
              }}
            >
              <span>{item.title}</span>
            </SearchItem>
          ))}
    </DropdownWrapper>
  );
};

export default Dropdown;
