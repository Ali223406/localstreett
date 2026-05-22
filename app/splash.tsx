import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LocalStreetArt</Text>
      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#7209B7",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  subtitle: {
    color: "#F72585",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
  },
});
