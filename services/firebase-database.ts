import { get, getDatabase, ref, set } from "firebase/database"; // Import necessary functions from the Firebase Realtime Database library, which will be used to interact with the Realtime Database for performing operations such as retrieving data (get), initializing the database instance (getDatabase), creating references to database paths (ref), and setting data at specific paths (set).
import app from "./firebase-config";    // Import the initialized Firebase app instance from the firebase-config file, which will be used to initialize the Realtime Database instance and perform database operations using the app's configuration.

const database = getDatabase(app);

// 
const cleanData = (data: any) => {         // Define a helper function called cleanData that takes an object called data as an argument. This function will iterate over the key-value pairs of the data object and replace any undefined values with null. This is necessary because Firebase Realtime Database does not allow undefined values, and using null instead ensures that the data can be stored correctly in the database without causing errors.
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === undefined ? null : value,
    ]),
  );
};

export const createWithId = (         // Define an asynchronous function called createWithId that takes three parameters: path (a string representing the database path where the data should be stored), id (a string representing the unique identifier for the data), and data (an object containing the data to be stored). This function will clean the data using the cleanData helper function to ensure that there are no undefined values, and then use the set function to store the cleaned data at the specified path and ID in the Realtime Database.
  path: string,
  id: string,
  data: any,
): Promise<void> => {
  const safeData = cleanData(data);       // Clean the input data using the cleanData function to replace any undefined values with null, ensuring that the data can be stored in Firebase Realtime Database without causing errors due to undefined values.

  return set(ref(database, `${path}/${id}`), safeData);     // Use the set function to store the cleaned data at the specified path and ID in the Realtime Database. The ref function is used to create a reference to the specific location in the database where the data should be stored, which is constructed by combining the provided path and ID. The set function will write the safeData to that location in the database, and it returns a Promise that resolves when the operation is complete.
};

export const getById = (path: string, id: string): Promise<any> => {  // Define an asynchronous function called getById that takes two parameters: path (a string representing the database path where the data is stored) and id (a string representing the unique identifier for the data). This function will use the get function to retrieve the data from the specified path and ID in the Realtime Database, and return a Promise that resolves with the retrieved data. The ref function is used to create a reference to the specific location in the database where the data is stored, which is constructed by combining the provided path and ID. The get function will fetch the data from that location, and the resulting snapshot's val() method is called to extract the actual data value from the snapshot.
  return get(ref(database, `${path}/${id}`)).then((snap) => snap.val());
};
