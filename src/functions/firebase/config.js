// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBtBVtnNTp1ESqn82x5H1frIR7CP0z1DT4",
      authDomain: "cre8ivcove-intern-testing-app.firebaseapp.com",
      projectId: "cre8ivcove-intern-testing-app",
      storageBucket: "cre8ivcove-intern-testing-app.appspot.com",
      messagingSenderId: "968790577602",
      serviceAccountId: "cre8ivcove-tool@blessing-printing-adveritsing.iam.gserviceaccount.com",
      appId: "1:968790577602:web:b263cf1da8e401923bc65b"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    export const functions = getFunctions(app);