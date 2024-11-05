import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "./patientThunk";

const initialState = {
    category: [],
};

const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.category = action.payload.data;
        });
    },
});

export default patientSlice.reducer;
