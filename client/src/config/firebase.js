// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpaqQYWs_1gf-eha84e-tqHJsDE4xSgj8",
  authDomain: "fidelphoneid.firebaseapp.com",
  projectId: "fidelphoneid",
  storageBucket: "fidelphoneid.firebasestorage.app",
  messagingSenderId: "108805140676",
  appId: "1:108805140676:web:a281eb65a48bb50543d991"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();