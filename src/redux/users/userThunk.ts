import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { addDoc, collection } from "@firebase/firestore";

export const createUser = createAsyncThunk(
  "user/create",
  async (payload: { name: string; email: string; password: string }) => {
    const { name, email, password } = payload;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
    });
    return user;
  }
);
export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    return user;
  }
);
