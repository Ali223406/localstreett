import { createArtwork } from "@/services/artwork-service";
import { storage } from "@/services/firebase-config";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Photo() {
  const cameraRef = useRef<any>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const [permission, requestPermission] = useCameraPermissions();

  const auth = getAuth();
  const user = auth.currentUser;

  if (!permission) return <View />;

  if (!permission.granted) {
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

  // 📸 TAKE PHOTO
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
      console.log("🚀 Publishing photo...");

      let coords = null;

      // 📍 LOCATION
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

      // ☁️ CONVERT IMAGE TO BLOB
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

      // 📦 SAVE ARTWORK
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
