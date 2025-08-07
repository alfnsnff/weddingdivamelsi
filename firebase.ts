// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfL0b9VxspS7Xefkott_oCgz_H0kEy4Yo",
  authDomain: "weddingdivamelsi.firebaseapp.com",
  projectId: "weddingdivamelsi",
  storageBucket: "weddingdivamelsi.firebasestorage.app",
  messagingSenderId: "561810065403",
  appId: "1:561810065403:web:b7bd8d85ffa1c76802ad5e",
  measurementId: "G-37RXNEBLY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);