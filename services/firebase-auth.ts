import {
  createUserWithEmailAndPassword, // create a new user with email and password
  getAuth,                 // get the authentication instance
  signInWithEmailAndPassword, // sign in a user with email and password
  signOut,                // sign out the current user
} from "firebase/auth";           

import app from "./firebase-config"; // import firebase app configuration
import { createWithId } from "./firebase-database";  // import a helper function to create a document in Firestore with a specific ID

const auth = getAuth(app); // initialize the authentication instance with the firebase app configuration

export default auth;            // export the authentication instance for use in other parts of the application

/* ---------------- SIGNUP ---------------- */
export const signup = async (                   // define an asynchronous function for signing up a new user
  email: string,                  
  password: string,          // the user's email and password for authentication
  nickname: string,
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password); // create a new user with the provided email and password, and wait for the result

    const uid = result.user.uid;        // get the unique user ID from the result of the signup operation

    await createWithId("users", uid, {    // create a new document in the "users" collection in Firestore with the user's UID as the document ID, and store the user's information
      uid,
      nickname,
      email,
    });

    console.log("SIGNUP SUCCESS:", result.user); // log the successful signup operation and the user information

    return result.user;  // return the user information from the signup operation
  } catch (error: any) { // catch any errors that occur during the signup process
    console.log("SIGNUP ERROR:", error.code);   // log the error code for debugging purposes
    throw error;
  }
};

/* ---------------- LOGIN ---------------- */
export const login = async (email: string, password: string) => { // define an asynchronous function for logging in a user with email and password
  try {
    const result = await signInWithEmailAndPassword(auth, email, password); // sign in the user with the provided email and password, and wait for the result

    console.log("LOGIN SUCCESS:", result.user);

    return result.user;  // return the user information from the login operation
  } catch (error: any) {     // catch any errors that occur during the login process
    console.log("LOGIN ERROR:", error.code);  // log the error code for debugging purposes
    throw error;
  }
};

/* ---------------- LOGOUT ---------------- */
export const logout = async () => {  // define an asynchronous function for logging out the current user
  try {
    await signOut(auth); // sign out the current user and wait for the operation to complete
    console.log("Déconnecté.e !");  // log a message indicating that the user has been successfully logged out
  } catch (error) { // catch any errors that occur during the logout process
    console.log("LOGOUT ERROR:", error);
    throw error;
  }
};
