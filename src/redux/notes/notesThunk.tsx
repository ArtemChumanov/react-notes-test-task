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

export const getNotesByUserId = createAsyncThunk<IFolder[], string>(
  "notes/getAllNotes",
  async (payload, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "folders"),
        where("userId", "==", payload)
      );
      const doc = await getDocs(q);
      const data = doc.docs.map((i) => ({
        ...i.data(),
        id: i.id,
      }));
      return data as IFolder[];
    } catch (e) {
      return rejectWithValue("failed to get data");
    }
  }
);
export const addFolder = createAsyncThunk<
  IFolder[],
  {
    title: string;
    lock: false;
    notesList: INote[];
    id: number;
    userId: string;
  }
>("notes/addFolder", async (payload, { rejectWithValue }) => {
  try {
    await addDoc(collection(db, "folders"), {
      ...payload,
    });
    const q = query(
      collection(db, "folders"),
      where("userId", "==", payload.userId)
    );
    const doc = await getDocs(q);
    const data = doc.docs.map((i) => ({
      ...i.data(),
      id: i.id,
    }));
    return data as IFolder[];
  } catch (e) {
    return rejectWithValue("failed to add folder");
  }
});

export const updateFolder = createAsyncThunk<
  IFolder[],
  {
    folderId: string;
    currentFolder: any;
    folders: IFolder[];
  }
>("notes/updateFolder", async (payload, { rejectWithValue }) => {
  try {
    const { folderId, currentFolder, folders } = payload;
    const docRef = doc(db, "folders", folderId);
    await updateDoc(docRef, currentFolder);
    return folders as IFolder[];
  } catch (e) {
    return rejectWithValue("failed to update something");
  }
});
export const deleteFolder = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string;
  }
>("notes/deleteFolder", async (payload, { rejectWithValue }) => {
  try {
    const docRef = doc(db, "folders", payload);
    await deleteDoc(docRef);
    return payload as string;
  } catch (e) {
    return rejectWithValue("failed to delete data");
  }
});
