import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import booksSlice from "./slices/booksSlice";

export default configureStore({
    reducer: {
        books: booksSlice,
        filter: filterSlice,
    },
});
