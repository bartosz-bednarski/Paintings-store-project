import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
const firebaseUrl = firebaseConfig.databaseURL;
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const adminFirebase = "admin1234@gmail.com";
export { storage, firebaseUrl, adminFirebase };
