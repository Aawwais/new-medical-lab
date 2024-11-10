// src/store/patient/patientSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { deleteFetchTests, fetchCategory, fetchTests } from "./patientThunk";

const initialState = {
    category: [],
    selectedTests: [],
};

const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.category = action.payload.data;
            })
            .addCase(fetchTests.fulfilled, (state, action) => {
                const { tests, index } = action.payload;
                while (state.selectedTests.length <= index) {
                    state.selectedTests.push([]);
                }
                state.selectedTests[index] = tests;
            })
            .addCase(deleteFetchTests.fulfilled, (state, action) => {
                state.selectedTests = state.selectedTests.filter(
                    (items, index) => index !== action.payload.index
                );
            });
    },
});

export default patientSlice.reducer;
