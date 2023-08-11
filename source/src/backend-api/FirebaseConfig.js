// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDut0ua5_ITn2_tNh3NpEv9L_0hLluwKXk",
  authDomain: "novelist-2f812.firebaseapp.com",
  databaseURL: "https://novelist-2f812-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "novelist-2f812",
  storageBucket: "novelist-2f812.appspot.com",
  messagingSenderId: "976619935136",
  appId: "1:976619935136:web:b15bf101dff9e71b0580c5",
  measurementId: "G-55GDSS5CNM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
// const analytics = getAnalytics(app);