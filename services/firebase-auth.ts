import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import app from "./firebase-config";
import { createWithId } from "./firebase-database";

const auth = getAuth(app);

export default auth;

/* ---------------- SIGNUP ---------------- */
export const signup = async (
  email: string,
  password: string,
  nickname: string,
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const uid = result.user.uid;

    await createWithId("users", uid, {
      uid,
      nickname,
      email,
    });

    console.log("SIGNUP SUCCESS:", result.user);

    return result.user;
  } catch (error: any) {
    console.log("SIGNUP ERROR:", error.code);
    throw error;
  }
};

/* ---------------- LOGIN ---------------- */
export const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    console.log("LOGIN SUCCESS:", result.user);

    return result.user;
  } catch (error: any) {
    console.log("LOGIN ERROR:", error.code);
    throw error;
  }
};

/* ---------------- LOGOUT ---------------- */
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Déconnecté.e !");
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
    throw error;
  }
};
