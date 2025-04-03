// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth } from "@firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ1HfaXtxG_FJ3CvgfNJ88dmJYwf6uyio",
  authDomain: "interview-8e4c6.firebaseapp.com",
  projectId: "interview-8e4c6",
  storageBucket: "interview-8e4c6.firebasestorage.app",
  messagingSenderId: "727710958759",
  appId: "1:727710958759:web:86636f58177d8ad2ecc782",
  measurementId: "G-638TSPFPP8"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
