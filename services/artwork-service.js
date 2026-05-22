import {        // Import necessary functions from the Firebase Firestore library, which will be used to interact with the Firestore database for performing operations such as adding documents, retrieving documents, and updating documents.
    addDoc,
    collection,
    doc,
    getDocs,
    increment,
    updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config"; // Import the Firestore database instance from the firebase-config file, which will be used to reference the "artwork" collection in the database for performing CRUD operations related to artworks.

//  GET ALL ARTWORKS
export const getAllArtworks = async () => { // Define an asynchronous function called getAllArtworks that retrieves all documents from the "artwork" collection in the Firestore database. The function uses the getDocs function to fetch the documents, and then maps over the resulting snapshot to return an array of artwork objects, each containing the document ID and its associated data.
  const snapshot = await getDocs(collection(db, "artwork"));

  return snapshot.docs.map((doc) => ({     // Map over the documents in the snapshot and return an array of artwork objects. Each object includes the document ID (doc.id) and the data from the document (doc.data()), which contains the fields and values for each artwork stored in the Firestore database.
    id: doc.id,
    ...doc.data(),
  }));
};

// LIKE ARTWORK
export const likeArtwork = async (id) => { // Define an asynchronous function called likeArtwork that takes an artwork ID as an argument. This function will increment the "likes" field of the specified artwork document in the Firestore database by 1. The function uses the doc function to create a reference to the specific artwork document based on its ID, and then uses the updateDoc function along with the increment function to update the "likes" field atomically, ensuring that concurrent updates to the same document are handled correctly.
  const ref = doc(db, "artwork", id);        // Create a reference to the specific artwork document in the "artwork" collection using the provided ID. This reference will be used to identify which document to update when incrementing the "likes" field.

  await updateDoc(ref, {       // Use the updateDoc function to update the specified document reference. The update operation will increment the "likes" field by 1 using the increment function, which ensures that if multiple users like the same artwork at the same time, the likes count will be updated correctly without conflicts.
    likes: increment(1),  // Increment the "likes" field by 1 for the specified artwork document. This will increase the total number of likes for that artwork each time the likeArtwork function is called with the corresponding artwork ID.
  });
};

//  CREATE ARTWORK
export const createArtwork = async (data) => {   // Define an asynchronous function called createArtwork that takes an object called data as an argument. This function will add a new document to the "artwork" collection in the Firestore database using the addDoc function. The data object should contain the necessary fields for the artwork, such as title, description, image URL, and any other relevant information. When the function is called, it will create a new artwork document in the database with the provided data.
  await addDoc(collection(db, "artwork"), data);
};
