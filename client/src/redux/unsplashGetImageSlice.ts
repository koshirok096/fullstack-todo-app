import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  copiedImageUrl: string;
  backgroundImage: string;
}

const initialState: ModalState = {
    copiedImageUrl: 'https://images.unsplash.com/photo-1581590212320-a1f693559160?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    backgroundImage: '', // Add the 'backgroundImage' property with an empty string as the initial value
  }

const unsplashGetImageSlice = createSlice({
    name: 'unsplashGetImage',
    initialState,
    reducers: {
      setCopiedImageUrl: (state, action: PayloadAction<string>) => {
        state.copiedImageUrl = action.payload;
      },
      setBackgroundImage: (state, action: PayloadAction<string>) => {
        state.backgroundImage = action.payload;
      },
    },
  });
  
  
export const { setCopiedImageUrl, setBackgroundImage } = unsplashGetImageSlice.actions;  

export default unsplashGetImageSlice.reducer
