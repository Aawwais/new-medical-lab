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
                const categoryQuery = query(
                    collection(db, "testCategory"),
                    where("name", "==", filter.category)
                );
                const categorySnapshot = await getDocs(categoryQuery);

                const testCategoryId = categorySnapshot.empty
                    ? null
                    : categorySnapshot.docs[0].id;
                testsQuery = query(
                    testsQuery,
                    where("testCategoryId", "==", testCategoryId)
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
            let tests = [];
            for await (let document of snapshot.docs) {
                const docRef = doc(
                    db,
                    "testCategory",
                    document.data().testCategoryId
                );
                const docSnapshot = await getDoc(docRef);
                tests.push({
                    uid: document.id,
                    ...document.data(),
                    testCategory: docSnapshot.data().name,
                });
            }

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
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const addTest = createAsyncThunk(
    "test/addTest",
    async ({ data, onSuccess }, { rejectWithValue }) => {
        try {
            const { testCategory, ...newData } = data;
            const uniqueId = uuidv4().slice(0, 8);

            const categoryQuery = query(
                collection(db, "testCategory"),
                where("name", "==", testCategory)
            );
            const querySnapshot = await getDocs(categoryQuery);

            let testCategoryId;

            if (!querySnapshot.empty) {
                testCategoryId = querySnapshot.docs[0].id;
            } else {
                const docCategory = await addDoc(
                    collection(db, "testCategory"),
                    { name: testCategory }
                );
                testCategoryId = docCategory.id;
            }

            const test = {
                ...newData,
                testCategoryId,
                testId: uniqueId,
                created_at: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, "tests"), test);
            const docSnapshot = await getDoc(docRef);

            onSuccess();
            return { uid: docRef.id, testCategory, ...docSnapshot.data() };
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
            let { testCategory, ...newData } = test;

            const categoryQuery = query(
                collection(db, "testCategory"),
                where("name", "==", testCategory)
            );
            const querySnapshot = await getDocs(categoryQuery);

            let testCategoryId;

            if (!querySnapshot.empty) {
                testCategoryId = querySnapshot.docs[0].id;
            } else {
                const docCategory = await addDoc(
                    collection(db, "testCategory"),
                    { name: testCategory }
                );
                testCategoryId = docCategory.id;
            }
            let update = {
                ...newData,
                testCategoryId,
            };
            await updateDoc(doc(db, "tests", id), update);
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
