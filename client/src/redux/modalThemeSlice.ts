import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    open: boolean;
}

const initialState: ModalState = {
    open: false
}

const modalThemeSlice = createSlice ({
    name: 'modalTheme',
    initialState,
    reducers: {
        openModalTheme: (state) => {
            state.open = true;
        },
        
        closeModalTheme:  (state) => {
            state.open = false;
        }
                
    }    
});

export const { openModalTheme, closeModalTheme } = modalThemeSlice.actions;  

export default modalThemeSlice.reducer
