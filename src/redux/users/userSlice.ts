import { createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./userThunk";

interface IUserState {
  email: string | null;
  token: string | null;
  id: string | null;
}

const initialState: IUserState = {
  email: "",
  token: "",
  id: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state: IUserState, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state: IUserState, action) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      console.log(payload);
      // state.email =  user.email
      //       token: user.accessToken,
      //       id: user.uid,
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }: any) => {
      state.token = payload.accessToken;
      state.id = payload.uid;
    });
  },
});
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
