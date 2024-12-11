// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUuOZuMZhdS6C65qyznOzlB94kwXtD1ts",
  authDomain: "commai-db002.firebaseapp.com",
  projectId: "commai-db002",
  storageBucket: "commai-db002.firebasestorage.app",
  messagingSenderId: "992623326607",
  appId: "1:992623326607:web:5017bc74f2e027a1a887fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;
