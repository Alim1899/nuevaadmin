// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaT-MGVXTYambJM9WCgv4RWj-JYCLqnUc",
  authDomain: "nueva-3a369.firebaseapp.com",
  databaseURL: "https://nueva-3a369-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nueva-3a369",
  storageBucket: "nueva-3a369.appspot.com",
  messagingSenderId: "401448645891",
  appId: "1:401448645891:web:298cfd27b9be8f94cde536",
  measurementId: "G-NH284R7KQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;