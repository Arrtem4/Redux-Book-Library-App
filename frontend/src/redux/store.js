import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import booksSlice from "./slices/booksSlice";
import errorSlice from "./slices/errorSlice";

export default configureStore({
    reducer: {
        books: booksSlice,
        filter: filterSlice,
        error: errorSlice,
    },
});
