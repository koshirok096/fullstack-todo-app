import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OpenSidebarState {
    open: boolean;
}

const initialState: OpenSidebarState = {
    open: true
}

const openSidebarSlice = createSlice ({
    name: 'OpenSidebar',
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.open = true;
            console.log("its open");
        },
        
        closeSidebar:  (state) => {
            state.open = false;
            console.log("no, NOO");
        }
                
    }    
});

export const { openSidebar, closeSidebar } = openSidebarSlice.actions;  

export default openSidebarSlice.reducer
