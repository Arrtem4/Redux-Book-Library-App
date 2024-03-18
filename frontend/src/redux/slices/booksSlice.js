import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBook from "../../utils/createBook";

export const fetchBook = createAsyncThunk("books/fetchBook", async () => {
    try {
        const res = await axios.get("http://localhost:4000/random-book");
        if (res.data.title && res.data.author) {
            return createBook(res.data, "random API");
        } else throw new Error("incorrect data in API");
    } catch (error) {
        console.log(error);
    }
});

const booksSlice = createSlice({
    name: "books",
    initialState: [],
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
    extraReducers: (builder) => {
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(fetchBook.rejected, (state, action) => {
            console.log(action.error);
        });
    },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
