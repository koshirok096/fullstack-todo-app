import { configureStore, combineReducers } from '@reduxjs/toolkit';
import modalTaskSlice from './modalTaskSlice';
import openSidebarSlice from './openSidebarSlice';
import modalThemeSlice from './modalThemeSlice';
import unsplashGetImageSlice from './unsplashGetImageSlice';
import userSlice from './userSlice';
import todoSlice from './todoSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  modal: modalTaskSlice,
  modalTheme: modalThemeSlice,
  sidebar: openSidebarSlice,
  unsplashGetImage: unsplashGetImageSlice,
  user: userSlice,
  todo: todoSlice
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['modal', 'modalTheme', 'unsplashGetImage'] // No Persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
