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
    backgroundColor: "#111",
    paddingTop: 50,
  },

  title: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#222",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },

  author: {
    color: "white",
    marginTop: 5,
  },

  likes: {
    color: "#F72585",
    marginVertical: 5,
  },

  mapText: {
    color: "#3A0CA3",
    marginTop: 5,
  },

  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#F72585",
    padding: 15,
    borderRadius: 50,
  },

  logout: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 8,
  },
});
