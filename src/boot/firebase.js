import firebase from "firebase/app"
import "firebase/firestore"
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBEILR8jeBIveBi36bV64BO3osrJqi74DU",
  authDomain: "tweet-186c6.firebaseapp.com",
  projectId: "tweet-186c6",
  storageBucket: "tweet-186c6.appspot.com",
  messagingSenderId: "388110640155",
  appId: "1:388110640155:web:a383c6f54e15aa98f584be"
});

const db = getFirestore()
export default db
