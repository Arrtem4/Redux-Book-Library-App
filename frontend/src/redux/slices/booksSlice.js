import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBook from "../../utils/createBook";
import { setError } from "./errorSlice";
import findMatch from "../../utils/findMatch";

const config = {
    withCredentials: "include",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "include",
        "Access-Control-Allow-Origin": "https://arrtem4.github.io",
        SameSite: "Lax",
    },
};

export const fetchBook = createAsyncThunk(
    "books/fetchBook",
    async (url, { dispatch, getState }) => {
        try {
            const res = await axios.get(url, config);
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
            localStorage.setItem("books", JSON.stringify(state.books));
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter(
                (book) => book.id !== action.payload
            );
            localStorage.setItem("books", JSON.stringify(state.books));
        },
        deleteAllBooks: (state, action) => {
            state.books = [];
            localStorage.clear();
        },
        toggleFavorite: (state, action) => {
            state.books.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite;
                }
            });
            localStorage.setItem("books", JSON.stringify(state.books));
        },
        getBooksFromLocalStorage: (state) => {
            if (localStorage.getItem("books")) {
                state.books = JSON.parse(localStorage.getItem("books"));
            }
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

export const {
    addBook,
    deleteBook,
    toggleFavorite,
    getBooksFromLocalStorage,
    deleteAllBooks,
} = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;
export default booksSlice.reducer;
