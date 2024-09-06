import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "./utils";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";

import { UserLogin, UserRegister } from "@/types/user-types";
import { where } from "firebase/firestore/lite";

export async function userRegister(userRegister: UserRegister) {
  console.log(userRegister);
  const userRef = collection(db, "user");
  const q = query(userRef, where("username", "==", userRegister.username));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    throw Error("username already use");
  }

  const res = await createUserWithEmailAndPassword(
    auth,
    userRegister.email,
    userRegister.password
  );

  await setDoc(doc(db, "user", res.user.uid), {
    username: userRegister.username,
    email: userRegister.email,
    awatar: userRegister.avatar,
    id: res.user.uid,
    blocked: [],
  });

  await setDoc(doc(db, "user-chats", res.user.uid), {
    chats: [],
  });
}

export async function userLogin(userLogin: UserLogin) {
  await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
}
