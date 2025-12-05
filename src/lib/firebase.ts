// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA95fy4z9s0Qn4-iVF8YzDj33iSQKegkPI",
    authDomain: "dealzo-shop.firebaseapp.com",
    projectId: "dealzo-shop",
    storageBucket: "dealzo-shop.firebasestorage.app",
    messagingSenderId: "618693206086",
    appId: "1:618693206086:web:1ed9d5bb49ecf1040b6a47"
};

// Prevent duplicate initialization during hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
