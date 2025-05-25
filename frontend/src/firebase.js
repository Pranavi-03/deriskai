import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYE67iazXfYujKGJN3CQVPHpR1CYveGsg",
  authDomain: "deriskai.firebaseapp.com",
  projectId: "deriskai",
  storageBucket: "deriskai.firebasestorage.app",
  messagingSenderId: "63178027177",
  appId: "1:63178027177:web:4587675c206caa789eb9b8",
 // measurementId: "G-GZQ0TND9EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//export const db = getFirestore(app);


export { auth };