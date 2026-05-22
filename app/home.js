import { logout } from "@/services/firebase-auth";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getAllArtworks, likeArtwork } from "@/services/artwork-service";

export default function Home() {
  const router = useRouter();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchArtworks();
    }, []),
  );
  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const data = await getAllArtworks();
      setArtworks(data);
    } catch (error) {
      console.log("Error fetching artworks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      await likeArtwork(id);
      fetchArtworks();
    } catch (error) {
      console.log("Error liking artwork:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const openMap = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    router.push(url);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
        onError={() => console.log("❌ IMAGE FAILED:", item.imageUrl)}
      />
      <Text style={styles.author}>@{item.authorNickname}</Text>

      <Text style={styles.likes}>❤️ {item.likes}</Text>

      {/* LIKE */}
      <TouchableOpacity onPress={() => handleLike(item.id)}>
        <Ionicons name="heart" size={24} color="white" />
      </TouchableOpacity>

      {/* MAP */}
      <TouchableOpacity
        onPress={() => openMap(item.location.latitude, item.location.longitude)}
      >
        <Text style={styles.mapText}>Open Map</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Loading artworks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Street Art</Text>

      {/* FEED */}
      <FlatList
        data={artworks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* ADD PHOTO */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/photo")}
      >
        <Ionicons name="camera" size={30} color="white" />
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    paddingTop: 50,
  },

  title: {
    color: "#7209B7",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#141420",
    marginHorizontal: 12,
    marginBottom: 15,
    borderRadius: 18,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 220,
  },

  author: {
    color: "#fff",
    marginTop: 10,
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
  },

  likes: {
    color: "#F72585",
    marginTop: 6,
    marginHorizontal: 12,
    fontWeight: "bold",
  },

  mapText: {
    color: "#7209B7",
    marginTop: 10,
    marginBottom: 12,
    marginHorizontal: 12,
    fontWeight: "600",
  },

  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#f72585",
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#f72585",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  logout: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#f72585",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
});
