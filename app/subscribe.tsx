import { signup } from "@/services/firebase-auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Subscribe() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!form.email || !form.password || !form.name) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);
      await signup(form.email, form.password, form.name);
      router.replace("/home");
    } catch {
      Alert.alert("Error", "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>LocalStreetArt</Text>
        <Text style={styles.subtitle}>Create account</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#888"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating..." : "Create account"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAFB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  /* HEADER */
  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#7209B7",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },

  /* CARD */
  card: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 22,
    marginBottom: 40,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  input: {
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 40,
    fontSize: 16,
    color: "#000",
  },

  button: {
    backgroundColor: "#F72585",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
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
