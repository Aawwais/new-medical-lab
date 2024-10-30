// src/features/auth/authThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
    serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const checkEmailExists = createAsyncThunk(
    "auth/checkEmailExists",
    async ({ email }, { rejectWithValue }) => {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                toast.error("Email is already in use");
                return true;
            }
            return false;
        } catch (error) {
            toast.error(error.message || "An unknown error occurred.");
            return rejectWithValue(error.message);
        }
    }
);

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ userData, onSuccess }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );
            const user = userCredential.user;

            const payload = {
                role: "admin",
                name: userData.name,
                email: userData.email,
                createdAt: serverTimestamp(),
            };

            await setDoc(doc(db, "users", user.uid), payload);
            toast.success("User Signed Up Successfully!");
            onSuccess();
            return { uid: user.uid, ...payload };
        } catch (error) {
            toast.error(error.message || "An unknown error occurred");
            return rejectWithValue(error.message);
        }
    }
);

export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ data, onSuccess }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                throw new Error("User not found");
            }

            const userData = { ...userDoc.data(), uid: user.uid };

            if (userData.status === "pending") {
                throw new Error("User not verified");
            }

            toast.success("User Signed In Successfully!");
            onSuccess();
            return userData;
        } catch (error) {
            toast.error(error.message || "An unknown error occurred");
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            toast.success("User Logged Out Successfully!");
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchStates = createAsyncThunk(
    "auth/fetchStates",
    async (_, { rejectWithValue }) => {
        try {
            const statesCollectionRef = collection(db, "states");
            const statesSnapshot = await getDocs(statesCollectionRef);

            return statesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
