// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6xDXH2LBjaX1_e2VoZdmVBGZBiudAs-U",
  authDomain: "todo-f850d.firebaseapp.com",
  databaseURL: "https://todo-f850d-default-rtdb.firebaseio.com",
  projectId: "todo-f850d",
  storageBucket: "todo-f850d.appspot.com",
  messagingSenderId: "972955069596",
  appId: "1:972955069596:web:aa7b6dbebe48c4699dd159",
  measurementId: "G-QX8P9PZX44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);