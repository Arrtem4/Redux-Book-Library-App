import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: "",
    reducers: {
        setError: (state, action) => {
            return action.payload;
        },
        clearError: (state, action) => {
            return "";
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export const selectErrorMessage = (state) => state.error;
export default errorSlice.reducer;
