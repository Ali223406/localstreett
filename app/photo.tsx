import { createArtwork } from "@/services/artwork-service"; // Import the createArtwork function from the local services directory, which is responsible for creating a new artwork entry in the database. This function will be called after successfully uploading a photo to Firebase Storage, and it takes an object with properties such as imageUrl, authorNickname, authorId, likes, and location to create a new artwork record in the database.
import { storage } from "@/services/firebase-config";    // Import the storage object from the local services directory, which is configured to interact with Firebase Storage. This object will be used to upload photos taken by the user to Firebase Storage and retrieve their download URLs for use in creating artwork entries in the database.
import { CameraView, useCameraPermissions } from "expo-camera"; // Import the CameraView component and the useCameraPermissions hook from the expo-camera library. The CameraView component will be used to display the camera interface for taking photos, while the useCameraPermissions hook will be used to request and manage camera permissions from the user, ensuring that the app has the necessary permissions to access the device's camera when the user attempts to take a photo.
import * as Location from "expo-location";    // Import the Location module from the expo-location library, which will be used to request location permissions and retrieve the user's current location when they attempt to publish a photo. This allows the app to associate geolocation data with the artwork being published, providing additional context and information about where the artwork was created or captured.
import { getAuth } from "firebase/auth";   // Import the getAuth function from Firebase Authentication, which will be used to access the current user's authentication state. This is necessary to associate the uploaded photo and created artwork with the authenticated user, allowing for features such as displaying the author's nickname and managing user-specific data in the database.
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";  // Import necessary functions from the Firebase Storage library, which will be used to upload photos to Firebase Storage and retrieve their download URLs. The ref function is used to create a reference to a specific location in Firebase Storage where the photo will be uploaded, the uploadBytes function is used to upload the photo as a blob to that location, and the getDownloadURL function is used to retrieve the publicly accessible URL of the uploaded photo for use in creating artwork entries in the database.
import { useRef, useState } from "react";      // Import the useRef and useState hooks from React, which will be used to manage state and references within the Photo component. The useRef hook will be used to create a reference to the CameraView component, allowing for programmatic access to the camera's methods (such as takePictureAsync), while the useState hook will be used to manage state variables such as the photo URI, uploaded URL, and permission status for the camera.
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Import necessary components from react-native to build the user interface for the Photo component. This includes components for styling (StyleSheet), displaying text (Text), creating touchable elements (TouchableOpacity), displaying images (Image), and structuring the layout (View). These components will be used to create the camera interface, display the captured photo, and provide buttons for taking and publishing photos.

export default function Photo() {    // Define the Photo component, which serves as the user interface for taking and publishing photos in the application. This component manages state for the captured photo, uploaded URL, and camera permissions, and includes functions for taking a photo with the device's camera and publishing it to Firebase Storage. The component also handles location permissions to associate geolocation data with the published artwork, and uses Firebase Authentication to associate the artwork with the authenticated user. The UI includes a camera view for capturing photos, a preview of the captured photo, and buttons for taking and publishing photos, with styles defined in the StyleSheet at the bottom of the file. 
  const cameraRef = useRef<any>(null);  // Use the useRef hook to create a reference called cameraRef, which will be attached to the CameraView component. This reference allows for programmatic access to the camera's methods, such as takePictureAsync, enabling the Photo component to capture photos when the user interacts with the UI.

  const [photo, setPhoto] = useState<string | null>(null); // Use the useState hook to create a state variable called photo and a corresponding setter function called setPhoto. This state variable will hold the URI of the captured photo, allowing the component to manage and display the photo in the UI. When a photo is taken using the camera, its URI will be stored in this state variable, which can then be used for previewing the photo and uploading it to Firebase Storage when the user chooses to publish it.
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const [permission, requestPermission] = useCameraPermissions(); // Use the useCameraPermissions hook from expo-camera to manage camera permissions. This hook returns an array with the current permission status and a function to request permissions. The permission variable will hold the current status of camera permissions (e.g., granted, denied, or undetermined), while the requestPermission function can be called to prompt the user to grant camera permissions if they have not already done so. This ensures that the app has the necessary permissions to access the device's camera when the user attempts to take a photo.

  const auth = getAuth(); // Call the getAuth function from Firebase Authentication to access the current authentication state of the user. This allows the Photo component to determine if a user is authenticated and to retrieve their information (such as displayName and uid) when publishing a photo. The authenticated user's information will be used to associate the uploaded photo and created artwork with the user, enabling features such as displaying the author's nickname and managing user-specific data in the database.
  const user = auth.currentUser;

  if (!permission) return <View />;    // If the permission variable is null or undefined, return an empty View component. This serves as a placeholder while the app is determining the current camera permission status. It prevents the rest of the UI from rendering until the permission status is known, ensuring that the app can properly handle cases where permissions are still being requested or have not yet been granted.

  if (!permission.granted) {       // If the camera permission has not been granted (i.e., permission.granted is false), return a View component that displays a message indicating that camera permission is required, along with a button to request camera permissions. This provides feedback to the user about why they cannot access the camera functionality and offers a way to grant the necessary permissions to use the feature.
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Permission caméra requise</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: "cyan", marginTop: 10 }}>
            Autoriser la caméra
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  //  TAKE PHOTO
  const takePhoto = async () => {
    const camera = cameraRef.current;
    if (!camera) return;

    const result = await camera.takePictureAsync();
    setPhoto(result.uri);
  };

  // ☁️ PUBLISH PHOTO
  const publishPhoto = async () => {
    if (!photo) return;

    if (!user) {
      alert("Utilisateur non connecté");
      return;
    }

    try {
      console.log(" Publishing photo...");

      let coords = null;

      //  LOCATION
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const pos = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          coords = pos.coords;
        }
      } catch (e) {
        console.log("❌ LOCATION FAILED:", e);
      }

      //  CONVERT IMAGE TO BLOB
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(new Error("Blob error"));
        xhr.responseType = "blob";
        xhr.open("GET", photo, true);
        xhr.send(null);
      });

      const filename = `photos/${Date.now()}.jpg`;
      const storageRef = ref(storage, filename);

      await uploadBytes(storageRef, blob as any, {
        contentType: "image/jpeg",
      });

      const downloadURL = await getDownloadURL(storageRef);

      console.log("📸 IMAGE URL:", downloadURL);

      //  SAVE ARTWORK
      await createArtwork({
        imageUrl: downloadURL,
        authorNickname: user.displayName || user.email || "anonymous",
        authorId: user.uid,
        likes: 0,
        location: coords
          ? {
              latitude: coords.latitude,
              longitude: coords.longitude,
            }
          : {
              latitude: 0,
              longitude: 0,
            },
      });

      console.log("✅ ARTWORK SAVED");

      setUploadedUrl(downloadURL);
      setPhoto(null);

      alert("Artwork publié !");
    } catch (error) {
      console.log("❌ UPLOAD ERROR :", error);
    }
  };

  return (
    <View style={styles.container}>
      {!photo ? (
        <View style={styles.camera}>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing="back"
          />

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              📸 Prendre photo
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.preview}>
          <Image source={{ uri: photo }} style={styles.image} />

          <TouchableOpacity style={styles.publish} onPress={publishPhoto}>
            <Text style={{ color: "#fff" }}>Publier</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPhoto(null)}
            style={styles.retake}
          >
            <Text style={{ color: "#fff" }}>Reprendre</Text>
          </TouchableOpacity>
        </View>
      )}

      {uploadedUrl && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Dernière photo uploadée :
          </Text>
          <Image source={{ uri: uploadedUrl }} style={styles.image} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
  },

  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  button: {
    marginBottom: 40,
    backgroundColor: "#F72585",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    shadowColor: "#F72585",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  preview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  image: {
    width: 320,
    height: 450,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1f1f2e",
  },

  publish: {
    marginTop: 20,
    backgroundColor: "#F72585",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    shadowColor: "#F72585",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  retake: {
    marginTop: 12,
    backgroundColor: "#1f1f2e",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
});
