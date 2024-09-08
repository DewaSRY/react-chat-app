# Dewa Surya React Chat app

A React-based real-time chat application that integrates various advanced features, including Firebase for real-time database management, text recognition, text-to-speech, speech-to-text, and a chatbot powered by an LLM (Large Language Model) for enhanced user interaction.

## Features

- **Real-time Chat:** Communicate with other users instantly using Firebase.
- **Text Recognition:** Optical character recognition (OCR) for recognizing text from images.
- **Text-to-Speech:** Convert chat messages into audio.
- **Speech-to-Text:** Transcribe speech input into text to send as messages.
- **Chatbot Integration:** A chatbot powered by an LLM model to assist and engage users with AI-generated responses.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (>= 14.x)
- npm or yarn
- Firebase account and project setup
- API keys for Gemini

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Set up Firebase Realtime Database and Firestore (for user authentication and chat storage).
3. Enable Firebase Authentication (Email/Password or Google Authentication).
4. Set up Firebase Storage for image uploads (if necessary for text recognition).
5. Add the Firebase configuration to your React app.

In `src/firebase/utils.ts`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

export default firebaseConfig;
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DewaSRY/react-chat-app.git
   cd react-chat-app
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Firebase and API keys:

   ```bash
   REACT_APP_FIREBASE_API_KEY=<api key>
   VITE_FIREBASE_API_KEY=<api key>
   VITE_FIREBASE_CLOUD_API_KEY=<api key>

   ```

4. **Start the development server:**

   ```bash
   pnpm run dev
   ```

## Usage

### 1. **Real-Time Chat**

- Once logged in, users can chat with others in real time.
- Chats are synced instantly using Firebase's real-time database.

### 2. **Text Recognition**

- Upload an image, and the app will recognize and extract text using an OCR library (e.g., Google Vision API).
- Recognized text can be directly used in chat.

### 3. **Text-to-Speech**

- Users can convert any text message to audio using the Web Speech API or Google Cloud Text-to-Speech API.
- The feature allows users to listen to messages instead of reading them.

### 4. **Speech-to-Text**

- Users can input messages using speech with speech recognition technology.
- Use the Web Speech API or Google Cloud Speech-to-Text API to convert spoken words into text.

### 5. **Chatbot (LLM Model Integration)**

- The chatbot, powered by an LLM Google Gemini, provides real-time responses.
- Users can interact with the chatbot in the chat interface.

## API Integration

### Firebase

- **Authentication:** Provides user authentication via Firebase Authentication.
- **Realtime Database:** Manages real-time message exchanges between users.
- **Firestore:** Stores user information, conversation histories, and other data.
- **Storage:** Handles image uploads for text recognition.

### Text Recognition

To integrate text recognition

- Browser api

### Text-to-Speech

To convert text to speech

- SpeechSynthesisUtterance

### Speech-to-Text

To transcribe speech into text, you can use:

- webkitSpeechRecognition

### Chatbot (LLM Model)

For chatbot integration,Use google gemini

<!-- - [OpenAI API](https://beta.openai.com/)

## How to Contribute

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request. -->

## Acknowledgements

- [Firebase](https://firebase.google.com/)
- [Google Cloud](https://cloud.google.com/)
- [OpenAI](https://openai.com/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
