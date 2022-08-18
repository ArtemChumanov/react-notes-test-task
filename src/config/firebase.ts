import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDTBxkDvKqLr04H_WsvPKVL_gV2PeASCTw",
  authDomain: "second-project-29bd8.firebaseapp.com",
  projectId: "second-project-29bd8",
  storageBucket: "second-project-29bd8.appspot.com",
  messagingSenderId: "643672763251",
  appId: "1:643672763251:web:1cac08430bd3b1a2fe3306",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
// export const db = getFirestore(app)
