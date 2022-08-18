export interface IFolder {
  id: string;
  title: string;
  lock: boolean;
  notesList: INote[];
}

export interface INote {
  id: number;
  title: string;
  time: string;
  text: string;
  lock: boolean;
}

export interface IFolderState {
  folders: IFolder[];
  //currentFolderIndex: number;
  // currentNoteIndex: number;
  currentIdFolder: string;
  currentIdNote: number | null;
  statusNotesCreating: boolean;
  statusNotesEditing: boolean;
}

export interface IEditItem {
  name: string;
  action?: string;
}
