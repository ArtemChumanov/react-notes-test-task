import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { IFolder, INote } from "../../types/types";

export const getNotesByUserId = createAsyncThunk(
  "notes/getAllNotes",
  async (payload: string) => {
    const q = query(
      collection(db, "folders") /*, where("userId", "==", payload)*/
    );
    const doc = await getDocs(q);
    const data = doc.docs.map((i) => ({
      ...i.data(),
      id: i.id,
    }));
    return data;
  }
);
export const addFolder = createAsyncThunk(
  "notes/addFolder",
  async (payload: {
    title: string;
    lock: false;
    notesList: INote[];
    id: number;
  }) => {
    await addDoc(collection(db, "folders"), {
      ...payload,
    });
    return { ...payload };
  }
);

export const updateFolder = createAsyncThunk(
  "notes/updateFolder",
  async (payload: {
    folderId: string;
    currentFolder: any;
    folders: IFolder[];
  }) => {
    const { folderId, currentFolder, folders } = payload;
    const docRef = doc(db, "folders", folderId);
    await updateDoc(docRef, currentFolder);
    return folders;
  }
);
export const deleteFolder = createAsyncThunk(
  "notes/deleteFolder",
  async (payload: string) => {
    const docRef = doc(db, "folders", payload);
    await deleteDoc(docRef);
  }
);
