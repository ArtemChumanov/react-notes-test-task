import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  addFolder,
  deleteFolder,
  getNotesByUserId,
  updateFolder,
} from "./notesThunk";
import { IFolder, IFolderState } from "../../types/types";

const initialState: IFolderState = {
  loading: false,
  error: null,
  folders: [],
  currentIdFolder: "",
  currentIdNote: null,
  statusPasswordForNoteCreating: false,
  statusNotesCreating: false,
  statusNotesEditing: false,
};

const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setCurrentIdFolder(state, { payload }: PayloadAction<string>) {
      state.currentIdFolder = payload;
    },
    setSelectNoteId(state, { payload }: PayloadAction<number | null>) {
      state.currentIdNote = payload;
    },
    toggleNoteCreating(state) {
      state.statusNotesCreating = false;
      state.statusNotesEditing = false;
      state.statusPasswordForNoteCreating = false;
    },
    notesAction(state, { payload }: PayloadAction<string>) {
      switch (payload) {
        case "create":
          state.statusNotesCreating = true;
          state.statusNotesEditing = false;
          break;
        case "edit":
          state.statusNotesEditing = true;
          state.statusNotesCreating = false;
          break;
        case "passwordCreate":
          state.statusPasswordForNoteCreating = true;
          state.statusNotesEditing = true;
          state.statusNotesCreating = false;
          break;
        default:
          break;
      }
    },
    setDeleteFolders(state) {
      const prevNote = current(state.folders);
      state.folders = prevNote.filter((i) => i.id !== state.currentIdFolder);
      state.currentIdFolder = state.folders[state.folders.length - 1]?.id || "";
    },
    clearData(state) {
      state.folders = [];
      state.currentIdFolder = "";
      state.currentIdNote = null;
      state.statusNotesCreating = false;
      state.statusNotesEditing = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotesByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getNotesByUserId.fulfilled,
      (state, { payload }: PayloadAction<IFolder[]>) => {
        state.folders = payload;
        state.loading = false;
        state.currentIdFolder = payload[0]?.id || "";
      }
    );
    builder.addCase(
      getNotesByUserId.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
      }
    );
    builder.addCase(
      addFolder.fulfilled,
      (state, { payload }: PayloadAction<IFolder[]>) => {
        state.folders = payload;
        state.currentIdFolder = payload[payload.length - 1].id;
      }
    );
    builder.addCase(
      addFolder.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
      }
    );
    builder.addCase(
      updateFolder.fulfilled,
      (state, { payload }: PayloadAction<IFolder[]>) => {
        state.folders = payload;
      }
    );
    builder.addCase(
      updateFolder.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
      }
    );
    builder.addCase(deleteFolder.fulfilled, (state) => {
      const prevFolder = current(state.folders);
      state.folders = prevFolder.filter((i) => i.id !== state.currentIdFolder);
      state.currentIdFolder = "";
    });
    builder.addCase(
      deleteFolder.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
      }
    );
  },
});
export const {
  toggleNoteCreating,
  notesAction,
  setCurrentIdFolder,
  setSelectNoteId,
  clearData,
} = noteSlice.actions;

export default noteSlice.reducer;
