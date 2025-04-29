import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        sharedObject: null,
    },
    reducers: {
        setSharedObject: (state, action) => {
            state.sharedObject = action.payload;
        },
        clearSharedObject: (state) => {
            state.sharedObject = null;
        },
    },
});

export const { setSharedObject, clearSharedObject } = dataSlice.actions;
export default dataSlice.reducer;
