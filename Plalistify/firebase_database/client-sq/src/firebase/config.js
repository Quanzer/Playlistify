import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUdI36Y9Bfi2Psv1SSmgW9nDGwqVJXsro",
  authDomain: "playlistify-ba03c.firebaseapp.com",
  databaseURL: "https://playlistify-ba03c-default-rtdb.firebaseio.com",
  projectId: "playlistify-ba03c",
  storageBucket: "playlistify-ba03c.appspot.com",
  messagingSenderId: "664164155510",
  appId: "1:664164155510:web:32a890f73ea3571dd89f57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);