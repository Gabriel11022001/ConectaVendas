import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const apiKey: string = process.env.EXPO_PUBLIC_API_KEY_FIREBASE ?? "";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "conectavendas-6d483.firebaseapp.com",
  projectId: "conectavendas-6d483",
  storageBucket: "conectavendas-6d483.firebasestorage.app",
  messagingSenderId: "1034056598290",
  appId: "1:1034056598290:web:133129472965950aaae9cb"
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

export { db };

