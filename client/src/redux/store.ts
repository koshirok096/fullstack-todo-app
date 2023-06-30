import { configureStore } from '@reduxjs/toolkit';
import modalTaskSlice from './modalTaskSlice';
import openSidebarSlice from './openSidebarSlice';
import modalThemeSlice from './modalThemeSlice';
import unsplashGetImageSlice from './unsplashGetImageSlice';

const store = configureStore({
  reducer: {
    modal: modalTaskSlice,
    modalTheme: modalThemeSlice,
    sidebar: openSidebarSlice,
    unsplashGetImage: unsplashGetImageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
