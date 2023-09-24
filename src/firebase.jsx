// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgHDnEb_oYBAAhGMG_k-ClOxEBnut1KvM",
  authDomain: "gallery-dec43.firebaseapp.com",
  projectId: "gallery-dec43",
  storageBucket: "gallery-dec43.appspot.com",
  messagingSenderId: "198005492641",
  appId: "1:198005492641:web:5bf5b936db2dd9055a99e0",
  measurementId: "G-GMGJDCDES6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;