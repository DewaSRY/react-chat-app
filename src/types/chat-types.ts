export interface SendMesage {
  image?: File;
  chatId: string;
  senderId: string;
  text: string;
  receiver: string;
}

export interface Chet {
  image?: File;
  chatId: string;
  senderId: string;
  text: string;
  receiver: string;
  lastMessage?: string;
  isSeen?: boolean;
  updatedAt?: number;
}
export interface Chets {
  message: Chet[];
  createdAt: string;
}
export interface ChatItem {
  chatId: string;
  lastMessage: string;
  receiverId: string;
  updatedAt: number;
}

export interface UserChat {
  chats: ChatItem[];
}