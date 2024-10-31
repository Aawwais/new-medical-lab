// src/features/test/testSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchTests, addTest, editTest, deleteTest } from "./testThunk"; // Import thunks

const initialState = {
    tests: [],
    lastVisible: null,
    hasMore: true,
};

const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTests.fulfilled, (state, action) => {
                state.lastVisible = action.payload.lastVisible;
                state.hasMore = action.payload.hasMore;
                action.payload.loadMore
                    ? (state.tests = [...state.tests, ...action.payload.tests])
                    : (state.tests = action.payload.tests);
            })
            .addCase(fetchTests.rejected, (state, action) => {
                console.error("Error fetching tests:", action.error);
            })
            .addCase(addTest.fulfilled, (state, action) => {
                state.tests.push(action.payload);
            })
            .addCase(addTest.rejected, (state, action) => {
                console.error("Error adding test:", action.error);
            })
            .addCase(editTest.fulfilled, (state, action) => {
                const index = state.tests.findIndex(
                    (test) => test.uid === action.payload.uid
                );
                if (index !== -1) state.tests[index] = action.payload;
            })
            .addCase(editTest.rejected, (state, action) => {
                console.error("Error editing test:", action.error);
            })
            .addCase(deleteTest.fulfilled, (state, action) => {
                state.tests = state.tests.filter(
                    (test) => test.uid !== action.payload
                );
            })
            .addCase(deleteTest.rejected, (state, action) => {
                console.error("Error deleting test:", action.error);
            });
    },
});

export default testSlice.reducer;
