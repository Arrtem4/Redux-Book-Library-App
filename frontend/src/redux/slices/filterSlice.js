import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        title: "",
    },
    reducers: {
        setTitle: (state, action) => {
            return { ...state, title: action.payload };
        },
    },
});

export const { setTitle } = filterSlice.actions;
export const selectTitle = (state) => state.filter.title;
export default filterSlice.reducer;
