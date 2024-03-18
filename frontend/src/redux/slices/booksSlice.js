import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBook from "../../utils/createBook";
import { setError } from "./errorSlice";
import findMatch from "../../utils/findMatch";

export const fetchBook = createAsyncThunk(
    "books/fetchBook",
    async (url, { dispatch, getState }) => {
        try {
            const res = await axios.get(url);
            if (res.data.title && res.data.author) {
                const state = getState().books.books;
                if (findMatch(state, res.data)) {
                    throw new Error("Book already exists");
                }
                return createBook(res.data, "random API");
            } else {
                throw new Error("incorrect data in API");
            }
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    }
);

const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: [],
        isLoadingViaAPI: false,
    },
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter(
                (book) => book.id !== action.payload
            );
        },
        toggleFavorite: (state, action) => {
            state.books.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite;
                }
            });
        },
    },
    extraReducers: {
        [fetchBook.pending]: (state) => {
            state.isLoadingViaAPI = true;
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.books.push(action.payload);
            state.isLoadingViaAPI = false;
        },
        [fetchBook.rejected]: (state, action) => {
            console.log(action.error);
            state.isLoadingViaAPI = false;
        },
    },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;
export default booksSlice.reducer;
