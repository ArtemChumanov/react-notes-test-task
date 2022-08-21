import React, { FC } from "react";
import styled from "styled-components/macro";
import WidgetItem from "./WidgetItem/WidgetItem";
import { INote } from "../../../../types/types";

interface WidgetsProps {
  onSelectNote: (arg: any) => void;
  notes: INote[];
}
const Widgets: FC<WidgetsProps> = ({ onSelectNote, notes }) => {
  return (
    <WidgetsWrapper>
      {notes &&
        notes.map((note) => (
          <WidgetItem key={note.id} note={note} onSelectNote={onSelectNote} />
        ))}
    </WidgetsWrapper>
  );
};

export default Widgets;
export const WidgetsWrapper = styled.div`
  overflow: auto;
  width: 949px;
  height: 502px;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 30px;
  box-sizing: border-box;
  background: ${({ theme }) => `${theme.backgrounds.darkBlue}`};
`;
