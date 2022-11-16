// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
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