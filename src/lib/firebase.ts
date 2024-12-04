import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqm5qxDN_RLwZbPkHOxXZZCrHj_YQjJGk",
  authDomain: "spanish-learning-pvp.firebaseapp.com",
  projectId: "spanish-learning-pvp",
  storageBucket: "spanish-learning-pvp.appspot.com",
  messagingSenderId: "859437921432",
  appId: "1:859437921432:web:b6c89d3e5c3f5a8b9c7d6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Set persistence properly
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});