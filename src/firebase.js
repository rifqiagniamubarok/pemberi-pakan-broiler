import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYoC6vsBUqUYnOaF9W-bwSTI9u3kETxGI",
  authDomain: "pemberi-pakan-broiler.firebaseapp.com",
  databaseURL: "https://pemberi-pakan-broiler-default-rtdb.firebaseio.com",
  projectId: "pemberi-pakan-broiler",
  storageBucket: "pemberi-pakan-broiler.appspot.com",
  messagingSenderId: "295810898848",
  appId: "1:295810898848:web:2cdc14e83d4d7c6ea7a2c5",
  measurementId: "G-2ESZ9Z0VW5",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export { database };
