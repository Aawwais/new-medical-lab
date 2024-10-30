import { createAsyncThunk } from "@reduxjs/toolkit";

//  CRUD (Create, Read, Update, Delete) Thunks for Portfolio Management
export const createPortfolio = createAsyncThunk(
  "portfolio/create",
  async ({ payload }, thunkAPI) => {
    try {
      const { data } = "";
      return data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPortfolio = createAsyncThunk(
  "portfolio/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = "";
      return data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updatePortfolio = createAsyncThunk(
  "portfolio/update",
  async ({ id, payload }, thunkAPI) => {
    try {
      const { data } = "";
      return data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removePortfolio = createAsyncThunk(
  "portfolio/remove",
  async (id, thunkAPI) => {
    try {
      const { data } = "";
      return data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
