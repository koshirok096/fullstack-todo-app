import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AppThunk } from "./store";
import axios from "axios";

interface UserState {
  currentUser: string | null;
  isLoading: boolean;
  error: boolean;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface SigninPayload {
  email: string;
  password: string;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    registerStart: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    registerFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    setUser: (state, action: PayloadAction<string | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutUser,
  registerStart,
  registerSuccess,
  registerFailed,
  setUser
} = userSlice.actions;

export default userSlice.reducer;
