import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        title: "",
        author: "",
        onlyFavorite: false,
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setAuthor: (state, action) => {
            state.author = action.payload;
        },
        setOnlyFavoriteFilter: (state) => {
            state.onlyFavorite = !state.onlyFavorite;
        },
        resetFilters: (state) => {
            state.title = "";
            state.author = "";
            state.onlyFavorite = false;
        },
    },
});

export const { setTitle, setAuthor, setOnlyFavoriteFilter, resetFilters } =
    filterSlice.actions;
export const selectTitle = (state) => state.filter.title;
export const selectAuthor = (state) => state.filter.author;
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavorite;
export default filterSlice.reducer;
