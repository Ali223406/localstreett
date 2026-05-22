import { auth } from "@/services/firebase-config";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/splash");
    } catch {
      alert("error");
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>LocalStreetArt</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/subscribe")}>
          <Text style={styles.link}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAFB",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  /* HEADER */
  header: {
    marginTop: 80,
    alignItems: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#7209B7",
  },

  subtitle: {
    fontSize: 15,
    color: "#888",
    marginTop: 6,
  },

  /* CARD */
  card: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 26,

    marginTop: 40,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 50,
  },

  /* INPUT */
  input: {
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#E5E5E5",

    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,

    marginBottom: 50, // 
    fontSize: 16,
    color: "#000",
  },

  /* BUTTON */
  button: {
    backgroundColor: "#F72585",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    marginTop: 14,
    textAlign: "center",
    color: "#F72585",
    fontWeight: "600",
  },
});
