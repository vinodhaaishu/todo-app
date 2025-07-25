// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRbo9I9dy03lXYoQ9EKlXY7cPAVTfpnNw",
  authDomain: "todo-app-c3670.firebaseapp.com",
  projectId: "todo-app-c3670",
  storageBucket: "todo-app-c3670.appspot.com",
  messagingSenderId: "335723724583",
  appId: "1:335723724583:web:68d089cc659643e7d23302",
  measurementId: "G-4FJTSJLDLE"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ Export for use in other files
export { auth, provider, db };
