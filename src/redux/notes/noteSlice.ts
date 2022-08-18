import { createSlice, current } from "@reduxjs/toolkit";
import { addFolder, getNotesByUserId, updateFolder } from "./notesThunk";
import { IFolder, IFolderState } from "../../types/types";

const initialState: IFolderState = {
  folders: [],
  currentIdFolder: "",
  currentIdNote: null,
  statusNotesCreating: false,
  statusNotesEditing: false,
};

const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setCurrentIdFolder(state, action) {
      state.currentIdFolder = action.payload;
    },
    setSelectNoteId(state, action) {
      state.currentIdNote = action.payload;
    },
    toggleNoteCreating(state) {
      state.statusNotesCreating = false;
      state.statusNotesEditing = false;
    },
    notesAction(state, action) {
      switch (action.payload) {
        case "create":
          state.statusNotesCreating = true;
          state.statusNotesEditing = false;
          break;
        case "edit":
          state.statusNotesEditing = true;
          state.statusNotesCreating = false;
          break;
        default:
          break;
      }
    },
    setDeleteNotes(state, { payload }) {
      const findIndex = current(state.folders[payload]);
    },
    setDeleteFolders(state, { payload }: any) {
      const prevNote = current(state.folders);
      state.folders = prevNote.filter((i) => i.id !== state.currentIdFolder);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotesByUserId.fulfilled, (state, { payload }: any) => {
      state.folders = payload;
      state.currentIdFolder = payload[0].id;
    });
    builder.addCase(addFolder.fulfilled, (state, { payload }: any) => {
      state.folders = [...state.folders, payload];
    });
    builder.addCase(updateFolder.fulfilled, (state, { payload }: any) => {
      state.folders = payload;
    });
  },
});
export const {
  // setSelectFolderIndex,
  // setSelectNoteIndex,
  toggleNoteCreating,
  notesAction,
  //setSelectCurrentFolder,
  setDeleteFolders,
  setCurrentIdFolder,
  setSelectNoteId,
} = noteSlice.actions;

export default noteSlice.reducer;
