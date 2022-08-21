import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./userThunk";
import { IUser, IUserState } from "../../types/types";

const initialState: IUserState = {
  error: "",
  email: "",
  accessToken: "",
  uid: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUserState>) {
      state.email = payload.email;
      state.accessToken = payload.accessToken;
      state.uid = payload.uid;
    },
    removeUser(state: IUserState) {
      state.email = null;
      state.accessToken = null;
      state.uid = null;
    },
    cleanErrors(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createUser.fulfilled,
      (state, { payload }: PayloadAction<IUser>) => {
        state.email = payload.email;
        state.accessToken = payload.accessToken;
        state.uid = payload.uid;
      }
    );
    builder.addCase(
      createUser.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
      }
    );
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload }: PayloadAction<IUser>) => {
        state.accessToken = payload.accessToken;
        state.uid = payload.uid;
      }
    );
    builder.addCase(loginUser.rejected, (state, { payload }: any) => {
      state.error = payload;
    });
  },
});
export const { setUser, removeUser, cleanErrors } = userSlice.actions;

export default userSlice.reducer;
