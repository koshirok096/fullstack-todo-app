import { configureStore } from '@reduxjs/toolkit';
import modalTaskSlice from './modalTaskSlice';
import openSidebarSlice from './openSidebarSlice';

const store = configureStore({
  reducer: {
    modal: modalTaskSlice,
    sidebar: openSidebarSlice
  },
});

export default store;
