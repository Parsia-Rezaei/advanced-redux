// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHry0F4ulUsvwbMSkIgJGWF8wUmCaemBU",
  authDomain: "redux-test-f09e1.firebaseapp.com",
  projectId: "redux-test-f09e1",
  storageBucket: "redux-test-f09e1.firebasestorage.app",
  messagingSenderId: "953980628966",
  appId: "1:953980628966:web:6857bb6028498c004e7027"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;