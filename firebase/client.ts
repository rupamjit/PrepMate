import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyQCVHjkKwMLt6cGz77ommyQBEN4e9hug",
  authDomain: "mock-interview-871e8.firebaseapp.com",
  projectId: "mock-interview-871e8",
  storageBucket: "mock-interview-871e8.firebasestorage.app",
  messagingSenderId: "878952967961",
  appId: "1:878952967961:web:e7fe34241120dbf770df88",
  measurementId: "G-ZGR1160PWX"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);