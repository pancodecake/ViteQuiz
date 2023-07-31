// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnYMArnXottVQ8voESR9kB7o6_ez-4UDQ",
  authDomain: "reactquiz-7548a.firebaseapp.com",
  projectId: "reactquiz-7548a",
  storageBucket: "reactquiz-7548a.appspot.com",
  messagingSenderId: "792373914142",
  appId: "1:792373914142:web:f0eb598c2a6c42961e1c0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const quizCollection = collection(database,'notes')
