import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKpOzG7v8T1D4HWV-zLHRcdCjedCmkhXQ",
  authDomain: "localstreet-b93f0.firebaseapp.com",
  projectId: "localstreet-b93f0",
  storageBucket: "localstreet-b93f0.firebasestorage.app",
  messagingSenderId: "614247043736",
  appId: "1:614247043736:web:9436b50b48160d784476ed",
};

const app = initializeApp(firebaseConfig);

// ✅ IMPORTANT : Auth
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
