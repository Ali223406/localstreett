import { logout } from "@/services/firebase-auth";   // Import the logout function from the local services directory, which is configured to interact with Firebase Authentication. This function will be used to handle user logout functionality in the Home component, allowing users to sign out of their accounts and navigate back to the login screen when they choose to log out.
import { Ionicons } from "@expo/vector-icons";     // Import the Ionicons component from the @expo/vector-icons library, which provides a set of icons that can be used in the application. This component will be used to display icons such as the heart icon for liking artworks and the camera icon for adding new photos in the Home component.
import { useFocusEffect } from "@react-navigation/native";      // Import the useFocusEffect hook from react-navigation, which allows the Home component to perform side effects (such as fetching data) when the screen is focused. This hook will be used to fetch the list of artworks from the Firestore database whenever the Home screen is focused, ensuring that the displayed artworks are up-to-date whenever the user navigates to the Home screen.
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";      // Import the useCallback and useState hooks from React, which will be used to manage state and memoize functions in the Home component. The useState hook will be used to manage the state of artworks and loading status, while the useCallback hook will be used to memoize the function that fetches artworks, preventing unnecessary re-renders and improving performance when the Home screen is focused.
import {                                        // Import necessary components from the react-native library, which will be used to build the user interface of the Home component. This includes components for displaying lists (FlatList), images (Image), styling (StyleSheet), text (Text), touchable elements (TouchableOpacity), and view containers (View).
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getAllArtworks, likeArtwork } from "@/services/artwork-service"; // Import the getAllArtworks and likeArtwork functions from the local services directory, which are configured to interact with the Firestore database for managing artworks. The getAllArtworks function will be used to fetch the list of artworks to display in the Home component, while the likeArtwork function will be used to handle the functionality of liking an artwork, allowing users to increment the like count for a specific artwork in the database when they tap the like button in the UI.

export default function Home() {          // Define the Home component, which serves as the main screen of the application where users can view a feed of street art, like artworks, and navigate to other screens such as adding new photos or logging out. The component uses state to manage the list of artworks and loading status, and it utilizes various hooks to handle side effects and navigation based on user interactions.
  const router = useRouter();

  const [artworks, setArtworks] = useState([]);  // Use the useState hook to create a state variable called "artworks" and a corresponding setter function "setArtworks". This state will hold the list of artworks fetched from the Firestore database, allowing the component to render the artworks in the UI. The initial state is set to an empty array, indicating that there are no artworks loaded when the component first mounts.
  const [loading, setLoading] = useState(true);

  useFocusEffect(   // Use the useFocusEffect hook to perform a side effect when the Home screen is focused. This hook takes a function that will be executed whenever the screen comes into focus, allowing the component to fetch the latest list of artworks from the Firestore database each time the user navigates to the Home screen. The useCallback hook is used to memoize the function that fetches artworks, ensuring that it is not recreated on every render and only changes if its dependencies change (in this case, there are no dependencies, so it will only be created once).
    useCallback(() => {
      fetchArtworks();
    }, []),
  );
  const fetchArtworks = async () => {     // Define an asynchronous function called fetchArtworks that will be responsible for fetching the list of artworks from the Firestore database. This function uses a try-catch-finally block to handle the asynchronous operation of fetching data, managing loading state, and handling any potential errors that may occur during the fetch process. When called, it sets the loading state to true, attempts to fetch the artworks using the getAllArtworks function, updates the artworks state with the fetched data, and finally sets the loading state back to false regardless of whether the fetch was successful or if an error occurred.
    try {
      setLoading(true);
      const data = await getAllArtworks(); // Call the getAllArtworks function to fetch the list of artworks from the Firestore database. This function returns a promise that resolves to an array of artwork objects, which will be stored in the "data" variable once the promise is fulfilled.
      setArtworks(data);
    } catch (error) {
      console.log("Error fetching artworks:", error); // If an error occurs during the fetch operation, it is caught in the catch block, and an error message is logged to the console. This allows developers to identify and troubleshoot issues related to fetching artworks from the database, such as network errors or issues with the Firestore query.
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {  // Define an asynchronous function called handleLike that takes an artwork ID as an argument. This function will be responsible for handling the logic when a user taps the like button for a specific artwork. It uses a try-catch block to handle the asynchronous operation of liking an artwork, which involves calling the likeArtwork function to increment the like count for the specified artwork in the Firestore database. After successfully liking the artwork, it calls fetchArtworks to refresh the list of artworks and update the UI with the new like count. If an error occurs during the liking process, it is caught in the catch block, and an error message is logged to the console.
    try {
      await likeArtwork(id);
      fetchArtworks();
    } catch (error) {
      console.log("Error liking artwork:", error);
    }
  };

  const handleLogout = async () => { // Define an asynchronous function called handleLogout that will be responsible for handling the user logout functionality. When called, this function uses a try-catch block to handle the asynchronous operation of logging out the user using the logout function from Firebase Authentication. After successfully logging out, it uses the router.replace method from expo-router to navigate the user back to the login screen. If an error occurs during the logout process, it is caught in the catch block, and an error message is logged to the console.
    await logout();
    router.replace("/login");
  };

  const openMap = (lat, lng) => {       // Define a function called openMap that takes latitude and longitude as arguments. This function will be responsible for opening a map application (such as Google Maps) with the specified coordinates. It constructs a URL using the provided latitude and longitude in the format of a Google Maps query, and then uses the router.push method from expo-router to navigate to that URL, which will open the map application with the location of the artwork displayed.
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    router.push(url);
  };

  const renderItem = ({ item }) => ( // Define a function called renderItem that takes an object with an "item" property as an argument. This function will be used to render each individual artwork item in the FlatList component. It returns a JSX structure that displays the artwork's image, author nickname, like count, and buttons for liking the artwork and opening the map. The function uses various components from react-native to structure the UI for each artwork item, including Image for displaying the artwork image, Text for displaying the author and like count, and TouchableOpacity for creating interactive buttons for liking and opening the map.
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
        onError={() => console.log("❌ IMAGE FAILED:", item.imageUrl)} // Add an onError handler to the Image component to log an error message to the console if the image fails to load. This can help identify issues with image URLs or network problems that may prevent the artwork images from being displayed correctly in the UI.
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
