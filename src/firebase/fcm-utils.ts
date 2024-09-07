import { FCM_TOKEN_DB, messaging, db } from "./utils";
import { doc, setDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
// import type { FcmToken } from "@/types/fcm-types";
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

  //   console.log("this get call");
  if (fcmToke) {
    // console.log("tokken is ", fcmToke);
    const tokenRef = doc(db, FCM_TOKEN_DB, uid);
    await setDoc(tokenRef, {
      fcmToke,
    });
    console.log("test");
  } else {
    requestPermision(uid);
  }
}

export async function initNotifivation() {
  await onMessage(messaging, (payload) => {
    // console.log(payload);
    new Notification(
      payload.notification?.title ?? "This is React chat app build by Dewa ",
      {
        body: payload.notification?.body,
        icon: payload.notification?.image,
      }
    );
  });
}

// export async function sendNotification(receiverId: string, msg = "") {
//   const fcmDOc = doc(db, FCM_TOKEN_DB, receiverId);
//   const documentSnap = await getDoc(fcmDOc);
//   const fcmToken = documentSnap.data() as FcmToken;
//   //   console.log(documentSnap.data());

//   const payload = {
//     token: fcmToken.fcmToke,
//     notification: {
//       titla: "you gat new message",
//       body: msg,
//     },
//   };

//   // messaging.app.s
// }
