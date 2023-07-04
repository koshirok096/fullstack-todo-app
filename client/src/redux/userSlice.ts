import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AppThunk } from "./store";
import axios from "axios";

interface UserState {
  currentUser: string | null;
  isLoading: boolean;
  error: boolean;
  bgwallpaper: string | null;
  userId: string | null; // New state to hold the user's ID
  accessToken: string;
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

interface ModalThemePayload {
  bgwallpaper: string;
}

interface User {
  id: string;
  // 他のユーザープロパティ
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: false,
  bgwallpaper: 'https://images.unsplash.com/photo-1581590212320-a1f693559160?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', // 初期値を null に設定
  userId: null, // Initial value for the user's ID
  accessToken: '',
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
      state.userId = null;
      state.bgwallpaper = null;
      localStorage.clear();
      sessionStorage.clear();
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
    updateBackground: (state, action: PayloadAction<string>) => {
      state.bgwallpaper = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
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
  setUser,
  updateBackground,
  setUserId,
  setAccessToken,
} = userSlice.actions;

export default userSlice.reducer;
