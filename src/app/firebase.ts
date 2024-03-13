import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "glov-case-97a55.firebaseapp.com",
  projectId: "glov-case-97a55",
  storageBucket: "glov-case-97a55.appspot.com",
  messagingSenderId: "473371872077",
  appId: "1:473371872077:web:454d37e6f5669eac904504",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app };
export { db };
