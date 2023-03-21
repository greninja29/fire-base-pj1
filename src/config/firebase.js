import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider } from 'firebase/auth' 
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpLMYnjSF_J7j2Cf_Nt-eJuHIEr85CtgI",
  authDomain: "fir-project1-8ede6.firebaseapp.com",
  projectId: "fir-project1-8ede6",
  storageBucket: "fir-project1-8ede6.appspot.com",
  messagingSenderId: "1039712422043",
  appId: "1:1039712422043:web:5c5c43a48a54c28192de3e",
  measurementId: "G-LGSK1BNBGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)

