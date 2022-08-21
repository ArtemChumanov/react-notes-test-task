import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { errorsCodeCatalog } from "../../utils/errorsCatalog";
import { IUser } from "../../types/types";

export const createUser = createAsyncThunk<
  IUser,
  { name: string; email: string; password: string }
>("user/create", async (payload, { rejectWithValue }) => {
  try {
    const { name, email, password } = payload;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
    });
    return user as IUser;
  } catch (e: any) {
    // @ts-ignore
    return rejectWithValue(errorsCodeCatalog[e.code]);
  }
});
export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { email, password } = payload;
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (e: any) {
      // @ts-ignore
      return rejectWithValue(errorsCodeCatalog[e.code]);
    }
  }
);
