import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "int-v1.firebaseapp.com",
  projectId: "int-v1",
  storageBucket: "int-v1.appspot.com",
  messagingSenderId: "1037900691885",
  appId: "1:1037900691885:web:cb4a79cfcaa3dab463c924",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
