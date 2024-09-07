import { SendMesage, Chet } from "@/types/chat-types";
import { db, USER_CHAT_DB, USER_DB } from "@/firebase/utils";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import upload from "./firebase-upload";

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
    // const userChatsRef = doc(db, USER_CHAT_DB, id);
    // const userChatsSnapshot = await getDoc(userChatsRef);

    // if (userChatsSnapshot.exists()) {
    //   const userChatsData = userChatsSnapshot.data() as { chats: Chet[] };

    //   const chatIndex = userChatsData.chats.findIndex(
    //     (c) => c.chatId === chatId
    //   );

    //   userChatsData.chats[chatIndex].lastMessage = text;
    //   userChatsData.chats[chatIndex].isSeen = id === senderId ? true : false;
    //   userChatsData.chats[chatIndex].updatedAt = new Date();

    //   await updateDoc(userChatsRef, {
    //     chats: userChatsData.chats,
    //   });
    // }
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
