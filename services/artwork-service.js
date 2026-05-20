import {
    addDoc,
    collection,
    doc,
    getDocs,
    increment,
    updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

// 📸 GET ALL ARTWORKS
export const getAllArtworks = async () => {
  const snapshot = await getDocs(collection(db, "artwork"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ❤️ LIKE ARTWORK
export const likeArtwork = async (id) => {
  const ref = doc(db, "artwork", id);

  await updateDoc(ref, {
    likes: increment(1),
  });
};

// ➕ CREATE ARTWORK
export const createArtwork = async (data) => {
  await addDoc(collection(db, "artwork"), data);
};
