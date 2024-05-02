import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3ER4vk_K46qS-tIopFw_XwHjkX-ONMfw",
  authDomain: "story-teller-db-1a5ac.firebaseapp.com",
  projectId: "story-teller-db-1a5ac",
  storageBucket: "story-teller-db-1a5ac.appspot.com",
  messagingSenderId: "773852472593",
  appId: "1:773852472593:web:2cdb6c7d7f60dbacdfd8b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(app);
export const storage = getStorage();