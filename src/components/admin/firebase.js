import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/storage";
import { getStorage } from "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCywBKohhLTDRoFFxOldGqsrT-fyI0D_G0",
  authDomain: "paintings4sale-28dda.firebaseapp.com",
  databaseURL:
    "https://paintings4sale-28dda-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "paintings4sale-28dda",
  storageBucket: "paintings4sale-28dda.appspot.com",
  messagingSenderId: "18883995715",
  appId: "1:18883995715:web:297d0d23e2721b46398cf6",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
