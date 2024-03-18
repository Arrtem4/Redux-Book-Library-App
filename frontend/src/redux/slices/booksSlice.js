import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBook from "../../utils/createBook";
import findMatch from "../../utils/findMatch";

const initialState = [];

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload);
        },
        deleteBook: (state, action) => {
            return state.filter((book) => book.id !== action.payload);
        },
        toggleFavorite: (state, action) => {
            state.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite;
                }
            });
        },
    },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
export const thunkFunction = async (dispatch, getState) => {
    try {
        const res = await axios.get("http://localhost:4000/random-book");
        console.log(res.data);
        if (!findMatch(initialState, res.data)) {
            const book = createBook(res.data, "random API");
            dispatch(addBook(book));
        } else {
            thunkFunction();
        }
    } catch (error) {
        console.log(error);
    }
};
export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
