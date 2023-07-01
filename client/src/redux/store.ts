import { configureStore, combineReducers } from '@reduxjs/toolkit';
import modalTaskSlice from './modalTaskSlice';
import openSidebarSlice from './openSidebarSlice';
import modalThemeSlice from './modalThemeSlice';
import unsplashGetImageSlice from './unsplashGetImageSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  modal: modalTaskSlice,
  modalTheme: modalThemeSlice,
  sidebar: openSidebarSlice,
  unsplashGetImage: unsplashGetImageSlice,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
