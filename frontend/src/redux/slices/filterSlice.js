import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        title: "",
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        resetFilters: (state) => {
            state.title = "";
        },
    },
});

export const { setTitle, resetFilters } = filterSlice.actions;
export const selectTitle = (state) => state.filter.title;
export default filterSlice.reducer;
