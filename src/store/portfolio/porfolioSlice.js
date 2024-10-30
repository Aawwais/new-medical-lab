import { createSlice } from "@reduxjs/toolkit";
import {
    createPortfolio,
    fetchPortfolio,
    removePortfolio,
    updatePortfolio,
} from "./portfolioThunk";
// import { toast } from "react-toastify";

const initialState = {
    userPortfolio: -1,
    providerPortfolio: [],
    isLoading: false,
    counter: 0,
};

export const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        increment(state, action) {
            state.counter++;
        },
        decrement(state, action) {
            state.counter--;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPortfolio.fulfilled, (state, action) => {
                state.userPortfolio = [...state.userPortfolio, action.payload];
            })
            .addCase(fetchPortfolio.fulfilled, (state, action) => {
                state.providerPortfolio = action.payload;
            })
            .addCase(updatePortfolio.fulfilled, (state, action) => {
                const index = state.userPortfolio.findIndex(
                    (item) => item._id === action.payload._id
                );
                state.userPortfolio[index] = action.payload;
            })
            .addCase(removePortfolio.fulfilled, (state, action) => {
                state.userPortfolio = state.userPortfolio.filter(
                    (item) => item._id !== action.payload
                );
            })
            .addMatcher(
                // Match all thunk actions (pending, fulfilled, rejected)
                (action) => action.type.startsWith("portfolio/"),
                (state, action) => {
                    switch (action.type.split("/")[2]) {
                        case "pending":
                            state.isLoading = true;
                            break;
                        case "fulfilled":
                            state.isLoading = false;
                            break;
                        case "rejected":
                            state.isLoading = false;
                            // toast.error("Something went wrong!");
                            break;
                    }
                }
            );
    },
});

export default portfolioSlice.reducer;
export const { increment, decrement } = portfolioSlice.actions;
