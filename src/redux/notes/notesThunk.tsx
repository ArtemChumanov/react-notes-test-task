import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";

export const getNotesByUserId = createAsyncThunk(
  "notes/getAllNotes",
  async (payload: string) => {
    const q = query(
      collection(db, "folders") /*, where("userId", "==", payload)*/
    );
    const doc = await getDocs(q);
    const data = doc.docs.map((i) => ({
      id: i.id,
      ...i.data(),
    }));
    return data;
    //console.log(data);
    // const res = await signInWithEmailAndPassword(auth, email, password);
    // const user = res.user;
    // console.log("USER", user);
    // return user;
  }
);
export const updateFolder = createAsyncThunk(
  "notes/updateFolder",
  async (payload: { folderId: string; currentFolder: any }) => {
    const { folderId, currentFolder } = payload;
    console.log(folderId, currentFolder);
    debugger;

    const docRef = doc(db, "folders", folderId);
    console.log(docRef);
    const res = await setDoc(docRef, currentFolder);
    console.log(res);
    //     const res = await collection(db,"folders")
    //         .doc("frank").update({
    //         "favorites.firebase": "Help")}
    // })
    // const foldersRef = doc(db, "folders", folderId);
    // await updateDoc(foldersRef, currentFolder);

    // const q = query(
    //     collection(db, "folders") /*, where("userId", "==", payload)*/
    // );
    // const doc = await getDocs(q);
    // const data = doc.docs.map((i) => ({
    //   ...i.data(),
    // }));
    // return data;
    //console.log(data);
    // const res = await signInWithEmailAndPassword(auth, email, password);
    // const user = res.user;
    // console.log("USER", user);
    // return user;
  }
);
