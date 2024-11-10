import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDoc,
    getDocs,
    orderBy,
    query,
    where,
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

export const fetchTests = createAsyncThunk(
    "patient/fetchTests",
    async ({ filter, index, onSuccess }, { rejectWithValue }) => {
        try {
            let testsQuery = query(
                collection(db, "tests"),
                orderBy("created_at", "desc")
            );

            if (filter?.category) {
                testsQuery = query(
                    testsQuery,
                    where("testCategory", "==", filter.category)
                );
            }
            if (filter?.testName) {
                testsQuery = query(
                    testsQuery,
                    where("testName", "==", filter.testName)
                );
            }
            if (filter?.testId) {
                testsQuery = query(
                    testsQuery,
                    where("testId", "==", filter.testId)
                );
            }
            const snapshot = await getDocs(testsQuery);
            let tests = [];
            snapshot.forEach((doc) =>
                tests.push({ uid: doc.id, ...doc.data() })
            );
            onSuccess(tests);
            return { tests, index };
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteFetchTests = createAsyncThunk(
    "patient/deleteFetchedTests",
    async ({ index }, { rejected }) => {
        try {
            return { index };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
