import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "int-v1.firebaseapp.com",
  projectId: "int-v1",
  storageBucket: "int-v1.appspot.com",
  messagingSenderId: "1037900691885",
  appId: "1:1037900691885:web:cb4a79cfcaa3dab463c924",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const messaging = getMessaging(app);

export const USER_DB = "user";
export const USER_CHAT_DB = "user-chats";
export const CHAT_DB = "chat";
export const FCM_TOKEN_DB = "fcm-token";
export const IMAGES_DB = "images";
export const GEMINI_DB = "gemini";

export async function requestPermision(uid: string) {
  console.log("request permision");
  const permision = await Notification.requestPermission();
  if (permision === "granted") {
    await saveMasagingDeviceToken(uid);
  }
}

export async function saveMasagingDeviceToken(uid: string) {
  const fcmToke = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_CLOUD_API_KEY,
  });

  if (fcmToke) {
    console.log("tokken is ", fcmToke);
    const tokenRef = doc(db, FCM_TOKEN_DB, uid);
    await setDoc(tokenRef, {
      fcmToke,
    });
  } else {
    requestPermision(uid);
  }
}
