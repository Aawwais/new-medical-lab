import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDoc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const fetchCategory = createAsyncThunk(
    "patient/fetchPatient",
    async (_, { rejectWithValue }) => {
        try {
            let categoryQuery = query(
                collection(db, "testCategory"),
                orderBy("name", "asc")
            );
            const snapshot = await getDocs(categoryQuery);
            let category = [];
            for await (let doc of snapshot.docs) {
                category.push({ id: doc.id, ...doc.data() });
            }

            return {
                data: category,
            };
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
