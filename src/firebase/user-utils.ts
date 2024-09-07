import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db, USER_DB, USER_CHAT_DB } from "./utils";
import imgUpload from "./firebase-upload";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";

import { UserLogin, UserRegister } from "@/types/user-types";
import { where } from "firebase/firestore/lite";
import type { User } from "@/types/user-types";

export async function userRegister(userRegister: UserRegister) {
  const userRef = collection(db, USER_DB);
  const q = query(userRef, where("username", "==", userRegister.username));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const currentdata = querySnapshot.docs[0].data() as User;
    if (currentdata.username === userRegister.username)
      throw Error("username already use");
  }

  const imgUrl = await imgUpload(userRegister.avatar);

  const res = await createUserWithEmailAndPassword(
    auth,
    userRegister.email,
    userRegister.password
  );

  await setDoc(doc(db, USER_DB, res.user.uid), {
    username: userRegister.username,
    email: userRegister.email,
    awatar: imgUrl,
    id: res.user.uid,
    blocked: [],
  });
  console.log(res);
  await setDoc(doc(db, USER_CHAT_DB, res.user.uid), {
    chats: [],
  });
}

export async function userLogin(userLogin: UserLogin) {
  console.log(userLogin);
  await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
}
export async function searchUser(username: string) {
  const userRef = collection(db, USER_DB);
  const q = query(userRef, where("username", "==", username));
  const querySnapShot = await getDocs(q);
  if (!querySnapShot.empty && querySnapShot.docs) {
    return querySnapShot.docs[0].data() as User;
  }
  return null;
}
