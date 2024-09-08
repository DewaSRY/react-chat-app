export interface GeminiMessagePayload {
  geminiChatId: string;
  text: string;
  owner: "user" | "gemini";
}

export interface GeminiMessages {
  owner: "user" | "gemini";
  text: string;
  createdAt: number;
}

export interface GeminiChatThread {
  messages: GeminiMessages[];
}
