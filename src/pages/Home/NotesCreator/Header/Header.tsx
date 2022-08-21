import React, {
  ChangeEvent,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import SearchIcon from "../../../../assets/icons/input-search.svg";
// @ts-ignore
import LockImage from "../../../../assets/icons/lock.svg";
// @ts-ignore
import Delete from "../../../../assets/icons/delete.svg";
import Input from "../../../../components/shared/Input/Input";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { IEditItem, INote } from "../../../../types/types";
import { removeUser } from "../../../../redux/users/userSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import useActiveAction from "../../../../hooks/useActiveAction";
import {
  GroupButton,
  HeaderWrapper,
  LeftPartStyle,
  RelativeContainer,
  RightPartStyle,
} from "./Header.styled";
import { ViewType } from "../../../../utils/constants";
import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";

const editItem: IEditItem[] = [
  { name: "Edit note", action: "edit" },
  { name: "Create note", action: "create" },
];
const lockItem = [
  { name: "create password for current note", action: "passwordCreate" },
];
interface HeaderProps {
  setOpenModal: () => void;
  setView: (arg: ViewType) => void;
  resetNote(): void;
  view: ViewType.LINE | ViewType.WIDGET;
  selectCurrentNoteHandle: (arg: INote) => void;
}
const Header: FC<HeaderProps> = ({
  setOpenModal,
  setView,
  resetNote,
  view,
  selectCurrentNoteHandle,
}) => {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const { activeAction } = useActiveAction();
  const [visibleInput, setVisibleInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedNotes, setSearchedNotes] = useState<INote[]>([]);
  const [activeLockButton, setActiveLockButton] = useState(false);
  const [activeEditButton, setActiveEditButton] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);

  const { currentIdFolder, currentIdNote, folders } = useAppSelector(
    (state) => state.notes
  );
  useOnClickOutside(searchRef, () => setVisibleInput(false));

  useEffect(() => {
    setActiveDropdown(searchValue.length > 0);
  }, [searchValue]);

  const visibleInputHandle = () => setVisibleInput(!visibleInput);

  const folderIndex = useMemo(
    () => folders.findIndex((folder) => folder.id === currentIdFolder),
    [currentIdFolder, folders]
  );
  const onChangeInputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const searched = folders[folderIndex].notesList.filter((note) =>
      note.title.includes(e.target.value)
    );
    setSearchedNotes(searched);
  };

  const onClickLockHandle = () => setActiveLockButton(!activeLockButton);
  const onClickEditableHandle = () => setActiveEditButton(!activeEditButton);
  const onExitHandle = () => dispatch(removeUser());

  const backgroundActive = (type: string) =>
    view === type ? "rgba(0, 0, 0, 0.2)" : "transparent";

  const changeViewHandle = (type: ViewType) => setView(type);

  return (
    <HeaderWrapper>
      <LeftPartStyle>
        <GroupButton>
          {/*Відображення нотатків у вигляді списку */}
          <Button
            imageButton={true}
            imageSrc={Line}
            styles={{
              padding: [10, 10, 10, 10],
              background: backgroundActive(ViewType.LINE),
            }}
            disabled={activeAction}
            onClick={() => changeViewHandle(ViewType.LINE)}
          />
          {/*Відображення нотатків у вигляді віджетів */}
          <Button
            imageButton={true}
            imageSrc={Grid}
            disabled={activeAction}
            styles={{
              padding: [10, 10, 10, 10],
              background: backgroundActive(ViewType.WIDGET),
            }}
            onClick={() => {
              changeViewHandle(ViewType.WIDGET);
              resetNote();
            }}
          />
          {/*Вихід */}
          <Button
            imageButton={true}
            imageSrc={Exit}
            styles={{ padding: [10, 10, 10, 10] }}
            onClick={onExitHandle}
          />
        </GroupButton>
        {/*кнопка для того щоб удалити папку зі всіма нотатками */}
        <Button
          imageButton={true}
          imageSrc={Delete}
          styles={{ padding: [10, 10, 10, 10] }}
          onClick={setOpenModal}
          disabled={activeAction}
        />
      </LeftPartStyle>
      <RightPartStyle>
        <GroupButton>
          <RelativeContainer>
            {/*кнопка для створення або редагування нотатків в папці(якщо папки ще*/}
            {/*немає вона задізейблена )
            для того щоб змогти відредагувати треба спочатку вибрати нотатки і тоді з'явиться поле "редагувати"

            поки ми в режимі редагування чи створення більшість кнопок не активні
            */}
            <Button
              imageButton={true}
              imageSrc={EditNotes}
              styles={{ padding: [10, 10, 10, 10] }}
              onClick={onClickEditableHandle}
              disabled={currentIdFolder === "" || activeAction}
            />
            {activeEditButton && currentIdFolder !== "" && (
              <Dropdown
                onClickOutSide={() => onClickEditableHandle()}
                items={editItem}
                selectCurrentNoteHandle={selectCurrentNoteHandle}
                changeViewHandle={changeViewHandle}
              />
            )}
          </RelativeContainer>
        </GroupButton>
        <GroupButton>
          {/*Кнопка для того щоб поставити пароль для вибраної нотатки (для того щоб кнопка стала клікабельною треба вибрати нотати ) */}
          <Button
            imageButton={true}
            imageSrc={LockImage}
            onClick={onClickLockHandle}
            styles={{ padding: [10, 10, 10, 10] }}
            disabled={currentIdNote === null || activeAction}
          />
          {activeLockButton && (
            <Dropdown
              onClickOutSide={() => onClickLockHandle()}
              items={lockItem}
              selectCurrentNoteHandle={selectCurrentNoteHandle}
              changeViewHandle={changeViewHandle}
            />
          )}
          {/*Кнопка для пошуку нотатків в конкретній папці */}
          <Button
            imageButton={true}
            imageSrc={SearchIcon}
            onClick={visibleInputHandle}
            styles={{ padding: [10, 10, 10, 10] }}
            disabled={currentIdFolder === "" || activeAction}
          />
          {visibleInput && (
            <RelativeContainer ref={searchRef}>
              <Input
                labelVisible={false}
                type={"text"}
                name={"search"}
                label={"Search"}
                styles={{ padding: [0, 10, 0, 10], margin: [0, 15, 0, 0] }}
                onChange={onChangeInputHandle}
              />
              {searchValue.length > 0 && activeDropdown && (
                <Dropdown
                  items={[]}
                  searchedItems={searchedNotes}
                  searchDropdown={true}
                  onClickOutSide={() => setActiveDropdown(false)}
                  selectCurrentNoteHandle={selectCurrentNoteHandle}
                  changeViewHandle={changeViewHandle}
                />
              )}
            </RelativeContainer>
          )}
        </GroupButton>
      </RightPartStyle>
    </HeaderWrapper>
  );
};

export default Header;
