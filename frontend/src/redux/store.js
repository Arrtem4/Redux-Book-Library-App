import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books/reducer";
import filterSlice from "./slices/filterSlice";

export default configureStore({
    reducer: {
        books: booksReducer,
        filter: filterSlice,
    },
});
