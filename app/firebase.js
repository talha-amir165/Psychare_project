// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3vvbyGmLOdGCWYDamks05wr2vXO3_N5M",
    authDomain: "psychare-8b2f5.firebaseapp.com",
    projectId: "psychare-8b2f5",
    storageBucket: "psychare-8b2f5.appspot.com",
    messagingSenderId: "308255777494",
    appId: "1:308255777494:web:43f416d25d36fb3c5fdf77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);