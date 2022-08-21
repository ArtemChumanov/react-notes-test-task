export interface IFolder {
  id: string;
  title: string;
  lock: boolean;
  notesList: INote[];
  userId: string;
}

export interface INote {
  id: number;
  title: string;
  time: string;
  text: string;
  lock: boolean;
  password: string;
}

export interface IUserState {
  email?: string | null;
  accessToken?: string | null;
  uid?: string | null;
  error: string;
}
export type IUser = Omit<IUserState, "error">;

export interface IFolderState {
  loading: boolean;
  error: null | string;
  folders: IFolder[];
  //currentFolderIndex: number;
  // currentNoteIndex: number;
  currentIdFolder: string;
  currentIdNote: number | null;
  statusNotesCreating: boolean;
  statusNotesEditing: boolean;
  statusPasswordForNoteCreating: boolean;
}

export interface IEditItem {
  name: string;
  action?: string;
}
export interface FormProps {
  errorMessage?: string;
}
