import { createSlice, current } from "@reduxjs/toolkit";
import update from "immutability-helper";
import { loginUser } from "../users/userThunk";
import { getNotesByUserId } from "./notesThunk";

interface INoteState {
  folders: {
    id: any;
    title: string;
    lock: boolean;
    notesList: {
      id: any;
      title: string;
      time: string;
      text: string;
      lock: boolean;
    }[];
  }[];
  currentFolder: any;
  currentFolderIndex: number;
  currentIdFolder: string;
  currentNoteIndex: number;
  statusNotesCreating: boolean;
  statusNotesEditing: boolean;
}

const initialState: INoteState = {
  folders: [
    {
      id: 1,
      title: "Folder1",
      lock: true,
      notesList: [
        {
          id: 1,
          title: "Test One",
          time: "13:00",
          text: "Lorem ipsum dolor sit amet, consectedsv sdvsdv",
          lock: true,
        },
        {
          id: 2,
          title: "Test Two",
          time: "17:00",
          text: "Lorem ipsum dolor sit amet, consectedsv sdvsdv",
          lock: false,
        },
      ],
    },
    {
      id: 2,
      title: "Folder2",
      lock: true,
      notesList: [
        {
          id: 1,
          title: "Test One",
          time: "13:00",
          text: "Lorem ipsum dolor sit amet, consectedsv sdvsdv",
          lock: true,
        },
      ],
    },
  ],
  currentFolder: {},
  currentFolderIndex: 0,
  currentNoteIndex: 0,
  currentIdFolder: "",
  statusNotesCreating: false,
  statusNotesEditing: false,
};

const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setSelectFolder(state, action) {
      state.currentFolder = action.payload;
    },
    setSelectFolderIndex(state, action) {
      state.currentFolderIndex = action.payload;
    },
    setSelectNoteIndex(state, action) {
      state.currentNoteIndex = action.payload;
    },
    setCurrentIdFolder(state, action) {
      state.currentIdFolder = action.payload;
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
    setSelectCurrentFolder(state, action) {
      state.currentFolder = action.payload;
    },
    setEditNotes(state, { payload }) {
      const prevFolders = current(state.folders);
      const prevNotes = prevFolders[payload.idFolder].notesList;
      const newNote = {
        ...prevNotes[payload.idNotes],
        title: payload.title,
        time: payload.time,
        text: payload.text,
      };
      const newNotesArray = [
        ...prevNotes.slice(0, payload.idNotes),
        newNote,
        ...prevNotes.slice(payload.idNotes + 1),
      ];
      const newFoldersArray = [
        ...prevFolders.slice(0, payload.idFolder),
        {
          ...prevFolders[payload.idFolder],
          notesList: newNotesArray,
        },
        ...prevFolders.slice(payload.idFolder + 1),
      ];
      state.folders = newFoldersArray;
    },
    setCreateNotes(state, { payload }) {
      const prevFolders = current(state.folders);
      const prevNotes = prevFolders[payload.idFolder].notesList;

      const newNote = {
        id: Math.random(),
        title: payload.title,
        time: payload.time,
        text: payload.text,
        lock: false,
      };
      const newNotes = [...prevNotes, newNote];

      // const newNotesArray = [
      //   ...prevNotes.slice(0, payload.idNotes),
      //   newNote,
      //   ...prevNotes.slice(payload.idNotes + 1),
      // ];
      const newFoldersArray = [
        ...prevFolders.slice(0, payload.idFolder),
        {
          ...prevFolders[payload.idFolder],
          notesList: newNotes,
        },
        ...prevFolders.slice(payload.idFolder + 1),
      ];

      state.folders = newFoldersArray;
    },
    setDeleteNotes(state, { payload }) {},
    setDeleteFolders(state, { payload }) {
      state.folders = state.folders.filter((el) => el.id === payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotesByUserId.fulfilled, (state, { payload }: any) => {
      state.folders = payload;
    });
  },
});
export const {
  setSelectFolderIndex,
  setSelectNoteIndex,
  toggleNoteCreating,
  notesAction,
  setSelectCurrentFolder,
  setEditNotes,
  setCreateNotes,
  setDeleteFolders,
  setCurrentIdFolder,
} = noteSlice.actions;

export default noteSlice.reducer;
