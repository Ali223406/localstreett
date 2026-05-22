import { initializeApp } from "firebase/app";     // Import the initializeApp function from the Firebase library, which is used to initialize a Firebase application with the provided configuration. This function will create an instance of the Firebase app that can be used to access various Firebase services such as authentication, Firestore, and storage.
import { getAuth } from "firebase/auth";          // Import the getAuth function from the Firebase Authentication library, which will be used to initialize and access the Firebase Authentication service for handling user authentication in the application.
import { getFirestore } from "firebase/firestore";  // Import the getFirestore function from the Firebase Firestore library, which will be used to initialize and access the Firestore database service for storing and retrieving data in the application.
import { getStorage } from "firebase/storage";     // Import the getStorage function from the Firebase Storage library, which will be used to initialize and access the Firebase Storage service for handling file uploads and storage in the application.

const firebaseConfig = {             // Define the Firebase configuration object that contains the necessary credentials and identifiers for connecting to the Firebase project. This configuration includes the API key, authentication domain, project ID, storage bucket, messaging sender ID, and app ID, which are required to initialize the Firebase app and access its services.
  apiKey: "AIzaSyBKpOzG7v8T1D4HWV-zLHRcdCjedCmkhXQ",
  authDomain: "localstreet-b93f0.firebaseapp.com",
  projectId: "localstreet-b93f0",
  storageBucket: "localstreet-b93f0.firebasestorage.app",
  messagingSenderId: "614247043736",
  appId: "1:614247043736:web:9436b50b48160d784476ed",
};

const app = initializeApp(firebaseConfig); // Initialize the Firebase app using the provided configuration. This will create an instance of the Firebase application that can be used to access various Firebase services such as authentication, Firestore, and storage throughout the application. The initialized app instance is stored in the variable "app" for later use when initializing specific Firebase services.

// ✅ IMPORTANT : Auth
export const auth = getAuth(app);         // Initialize the Firebase Authentication service using the initialized app instance. This will allow the application to handle user authentication, including signing in, signing up, and managing user sessions. The initialized authentication service is stored in the variable "auth" for use in authentication-related operations throughout the application.
export const db = getFirestore(app);    // Initialize the Firestore database service using the initialized app instance. This will allow the application to store and retrieve data in a NoSQL database structure. The initialized Firestore service is stored in the variable "db" for use in database-related operations throughout the application, such as adding documents, retrieving documents, and updating documents in the Firestore database.
export const storage = getStorage(app);   // Initialize the Firebase Storage service using the initialized app instance. This will allow the application to handle file uploads and storage, such as uploading images or other media files to Firebase Storage. The initialized storage service is stored in the variable "storage" for use in storage-related operations throughout the application, such as uploading files, retrieving file URLs, and managing stored files in Firebase Storage.

export default app;              // Export the initialized Firebase app instance as the default export of this module, allowing other parts of the application to import and use the Firebase app instance when needed. This can be useful for accessing the app instance directly or for initializing additional Firebase services that may require the app instance as a parameter.
