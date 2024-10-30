import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import userSlice from "./auth/authSlice";
import portfolioSlice from "./portfolio/porfolioSlice";
import testSlice from "./tests/testSlice";
const reducers = combineReducers({
    user: userSlice,
    portfolio: portfolioSlice,
    tests: testSlice,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const rootReducer = (state, action) => {
    if (action.type === "RESET_ALL_SLICES") {
        storage.removeItem("persist:root");
        const { user, ...resetSlices } = state;
        const resetState = Object.keys(resetSlices).reduce((acc, key) => {
            acc[key] = undefined;
            return acc;
        }, {});
        state = {
            user,
            ...resetState,
        };
    }
    return persistedReducer(state, action);
};
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export default store;
