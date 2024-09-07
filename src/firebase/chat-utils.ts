import { db, USER_CHAT_DB, USER_DB, CHAT_DB } from "@/firebase/utils";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import upload from "./firebase-upload";
import type { SendMesage, Chet } from "@/types/chat-types";
import type { UserChat, MessageItem } from "@/types/chat-types";
import { User } from "@/types/user-types";

export async function sendMessaage(sendMessage: SendMesage) {
  const { chatId, receiver, senderId, text, image } = sendMessage;
  let imgUrl = null;

  if (image) {
    imgUrl = await upload(image);
  }

  await updateDoc(doc(db, USER_CHAT_DB, chatId), {
    messages: arrayUnion({
      senderId: senderId,
      text,
      createdAt: new Date(),
      imgUrl: imgUrl,
    }),
  });

  const userIDs = [senderId, receiver];
  userIDs.forEach(async (id) => {
    await folowUpChatData(id, text, chatId, senderId);
  });
}

async function folowUpChatData(
  id: string,
  text: string,
  chatId: string,
  senderId: string
) {
  const userChatsRef = doc(db, USER_CHAT_DB, id);
  const userChatsSnapshot = await getDoc(userChatsRef);

  if (userChatsSnapshot.exists()) {
    const userChatsData = userChatsSnapshot.data() as { chats: Chet[] };

    const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

    userChatsData.chats[chatIndex].lastMessage = text;
    userChatsData.chats[chatIndex].isSeen = id === senderId ? true : false;
    userChatsData.chats[chatIndex].updatedAt = Date.now();

    await updateDoc(userChatsRef, {
      chats: userChatsData.chats,
    });
  }
}

export async function addUserChat(senderId: string, userChatId: string) {
  const chatRef = collection(db, CHAT_DB);

  const newChatRef = doc(chatRef);
  await setDoc(newChatRef, {
    createdAt: serverTimestamp(),
    messages: [],
  });

  await updateDoc(doc(db, USER_CHAT_DB, senderId), {
    chats: arrayUnion({
      chatId: newChatRef.id,
      lastMessage: "",
      receiverId: userChatId,
      updatedAt: Date.now(),
    }),
  });

  await updateDoc(doc(db, USER_CHAT_DB, userChatId), {
    chats: arrayUnion({
      chatId: newChatRef.id,
      lastMessage: "",
      receiverId: senderId,
      updatedAt: Date.now(),
    }),
  });
}

function userChatComparator(a: MessageItem, b: MessageItem) {
  if (a.updatedAt || b.updatedAt) return 0;
  return b.updatedAt - a.updatedAt;
}
export async function getMessageItems(userChat: UserChat) {
  const promisses = userChat.chats.map(async (item) => {
    const userDocRef = doc(db, USER_DB, item.receiverId);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data() as User;
    return { ...item, user: userData } as MessageItem;
  });

  let chatData = await Promise.all(promisses);
  chatData = chatData.sort(userChatComparator);
  return chatData;
}
