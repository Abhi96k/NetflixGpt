import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADPUPGEqYr3JCMzD_5Nn6lvkzjlm-KWA4",
  authDomain: "netflixgpt-d33d8.firebaseapp.com",
  projectId: "netflixgpt-d33d8",
  storageBucket: "netflixgpt-d33d8.firebasestorage.app",
  messagingSenderId: "116777951001",
  appId: "1:116777951001:web:f6f3dd0454afa8fe21ef88",
  measurementId: "G-22V0SDL2Q2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;