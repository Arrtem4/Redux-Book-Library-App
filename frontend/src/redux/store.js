import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books/reducer";
import filterSlice from "./slices/filterSlice";
// import booksSlice from "./slices/booksSlice";

export default configureStore({
    reducer: {
        // books: booksSlice,
        books: booksReducer,
        filter: filterSlice,
    },
});
