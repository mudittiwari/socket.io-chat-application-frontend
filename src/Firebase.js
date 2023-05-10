import { initializeApp } from "firebase/app";
// import firebase from 'firebase/compat/firestore/dist/';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyCyfdGfYxhlXFJaQGcvuoALVOz1ngh314Q",
    authDomain: "shop-23a70.firebaseapp.com",
    projectId: "shop-23a70",
    storageBucket: "shop-23a70.appspot.com",
    messagingSenderId: "122533057108",
    appId: "1:122533057108:web:7e404ed152024770d813c1"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;