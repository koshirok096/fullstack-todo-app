import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    open: boolean;
}

const initialState: ModalState = {
    open: false
}

const modalTaskSlice = createSlice ({
    name: 'modalAddTask',
    initialState,
    reducers: {
        openModal: (state) => {
            state.open = true;
        },        
        closeModal:  (state) => {
            state.open = false;
        }
    }    
});

export const { openModal, closeModal } = modalTaskSlice.actions;  

export default modalTaskSlice.reducer
