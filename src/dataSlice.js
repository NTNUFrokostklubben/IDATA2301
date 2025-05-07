import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        sharedObject: null,

        user: {
            id: 0,
            name: "",
        }
    },
    reducers: {
        setCourseObject: (state, action) => {
            state.sharedObject = action.payload;
        },
        clearCourseObject: (state) => {
            state.sharedObject = null;
        },
        setUserObject: (state, action) => {
            state.user = {...action.payload};
        },
        clearUserObject: (state) =>{
            state.user = null;
        }
    },
});

export const { setCourseObject,
    clearCourseObject,setUserObject, clearUserObject } = dataSlice.actions;
export default dataSlice.reducer;
