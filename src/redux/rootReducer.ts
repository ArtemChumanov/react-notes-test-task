import {combineReducers} from "@reduxjs/toolkit";
import userSlice from "./users/userSlice";
import noteSlice from "./notes/noteSlice";

export const rootReducer = combineReducers({
users:userSlice,
    notes:noteSlice
})