import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        title: "",
        author: "",
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setAuthor: (state, action) => {
            state.author = action.payload;
        },
        resetFilters: (state) => {
            state.title = "";
            state.author = "";
        },
    },
});

export const { setTitle, setAuthor, resetFilters } = filterSlice.actions;
export const selectTitle = (state) => state.filter.title;
export const selectAuthor = (state) => state.filter.author;
export default filterSlice.reducer;
