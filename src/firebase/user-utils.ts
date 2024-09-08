import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db, USER_DB, USER_CHAT_DB } from "./utils";
// import imgUpload from "./firebase-upload";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { UserLogin, UserRegister } from "@/types/user-types";
import { where } from "firebase/firestore/lite";
import type { User, UserItem } from "@/types/user-types";

export async function userRegister(userRegister: UserRegister) {
  const userRef = collection(db, USER_DB);
  const q = query(userRef, where("username", "==", userRegister.username));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const currentdata = querySnapshot.docs[0].data() as User;
    if (currentdata.username === userRegister.username)
      throw Error("username already use");
  }

  const res = await createUserWithEmailAndPassword(
    auth,
    userRegister.email,
    userRegister.password
  );

  await setDoc(doc(db, USER_DB, res.user.uid), {
    username: userRegister.username,
    email: userRegister.email,
    id: res.user.uid,
    friends: [],
  });
  await setDoc(doc(db, USER_CHAT_DB, res.user.uid), {
    chats: [],
  });
}

export async function setFriends(userId: string, friendsId: string) {
  const userDocRef = doc(db, USER_DB, userId);
  await updateDoc(userDocRef, {
    friends: arrayUnion(friendsId),
  });
}

export async function userLogin(userLogin: UserLogin) {
  await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
}
export async function searchUser(username: string) {
  const userRef = collection(db, USER_DB);
  const q = query(userRef, where("username", "==", username));
  const querySnapShot = await getDocs(q);
  if (!querySnapShot.empty && querySnapShot.docs) {
    console.log(
      "query search",
      querySnapShot.docs.map((d) => d.data())
    );
    return querySnapShot.docs[0].data() as User;
  }

  return null;
}

export async function getAllUser(excludeUser: User): Promise<UserItem[]> {
  const colRef = collection(db, USER_DB);
  let userList: UserItem[] = [];
  const querySnapshot = await getDocs(colRef);

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const data = doc.data() as User;
      if (data.id !== excludeUser.id) {
        const findId = excludeUser.friends.filter((f) => f === data.id)[0];
        userList.push({
          ...data,
          isFriends: findId !== undefined,
        });
      }
    });
  }

  return userList;
}
