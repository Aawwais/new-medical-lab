// src/features/test/testThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDocs,
    query,
    limit,
    startAfter,
    orderBy,
    where,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    doc,
    addDoc,
    getDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuidv4 } from "uuid";

const PAGE_SIZE = 5;

export const fetchTests = createAsyncThunk(
    "test/fetchTests",
    async ({ filter, lastVisible, onSuccess }, { rejectWithValue }) => {
        try {
            let testsQuery = query(
                collection(db, "tests"),
                orderBy("created_at", "desc"),
                limit(PAGE_SIZE)
            );

            if (filter?.category) {
                testsQuery = query(
                    testsQuery,
                    where("testCategory", "==", filter.category)
                );
            }
            if (filter?.testId) {
                testsQuery = query(
                    testsQuery,
                    where("testId", "==", filter.testId)
                );
            }
            if (lastVisible) {
                testsQuery = query(testsQuery, startAfter(lastVisible));
            }

            const snapshot = await getDocs(testsQuery);
            const tests = snapshot.docs.map((doc) => ({
                uid: doc.id,
                ...doc.data(),
            }));
            const newLastVisible =
                snapshot.docs[snapshot.docs.length - 1] || null;
            const hasMore = snapshot.docs.length === PAGE_SIZE;
            onSuccess();
            return {
                tests,
                lastVisible: newLastVisible,
                hasMore,
                loadMore: lastVisible,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addTest = createAsyncThunk(
    "test/addTest",
    async ({ data, onSuccess }, { rejectWithValue }) => {
        try {
            const uniqueId = uuidv4().slice(0, 8);
            const test = {
                ...data,
                testId: uniqueId,
                created_at: serverTimestamp(),
            };
            console.log(test);
            const docRef = await addDoc(collection(db, "tests"), test);
            const docSnapshot = await getDoc(docRef);

            onSuccess();
            return { uid: docRef.id, ...docSnapshot.data() };
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const editTest = createAsyncThunk(
    "test/editTest",
    async ({ id, test, onSuccess }, { rejectWithValue }) => {
        try {
            await updateDoc(doc(db, "tests", id), test);
            onSuccess();
            return { uid: id, ...test };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTest = createAsyncThunk(
    "test/deleteTest",
    async ({ id, onSuccess }, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(db, "tests", id));
            onSuccess();
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
