import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR5hQWKL4_DBTZUJ4SOc3PfrTFN6iatqw",
  authDomain: "fdis-web.firebaseapp.com",
  projectId: "fdis-web",
  storageBucket: "fdis-web.appspot.com",
  messagingSenderId: "322062014504",
  appId: "1:322062014504:web:5097ccea9231dbe41abd1d",
  measurementId: "G-0NKVLM2D2D",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
