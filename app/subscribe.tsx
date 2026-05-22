import { signup } from "@/services/firebase-auth";  // Import the signup function from the local services directory, which is responsible for handling the user registration process using Firebase Authentication. This function will be called when the user submits the signup form, and it takes the user's email, password, and name as arguments to create a new account in Firebase Authentication and store the user's information in the database.
import { useRouter } from "expo-router";   // Import the useRouter hook from expo-router, which will be used to programmatically navigate between screens in the application. In this case, it will be used to navigate from the subscribe screen to the home screen after a successful signup, providing a smooth transition for users when they create a new account.
import { useState } from "react";  // Import the useState hook from React, which will be used to manage the state of the form inputs (name, email, and password) and the loading state during the signup process. This allows the component to update the UI based on user input and provide feedback during the asynchronous signup operation, such as disabling the signup button while the request is being processed and showing a loading indicator if desired.
import {  // Import necessary components and modules from react-native to build the user interface for the Subscribe screen. This includes components for styling (StyleSheet), displaying text (Text), handling user input (TextInput), creating touchable elements (TouchableOpacity), structuring the layout (View), and showing alerts (Alert). These components will be used to create a visually appealing and functional signup form that allows users to enter their name, email, and password, and provides feedback on the success or failure of the signup process.
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Subscribe() {   // Define the Subscribe component, which serves as the user interface for the signup screen of the application. This component uses state to manage the form inputs (name, email, and password) and the loading state during the signup process. It includes a function for handling the signup process when the user submits their information, which calls the signup function from Firebase Authentication and navigates to the home screen upon successful registration. The component also includes navigation to the login screen for users who already have an account, and displays a simple form with input fields for name, email, and password, along with a signup button.
  const router = useRouter();

  const [form, setForm] = useState({ // Use the useState hook to create a state variable called form and a corresponding setter function called setForm. This state variable is an object that holds the values of the name, email, and password input fields in the signup form. The initial state is set to an object with empty strings for each field, allowing the component to manage and update the form values as the user types.
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Use the useState hook to create a state variable called loading and a corresponding setter function called setLoading. This state variable is a boolean that indicates whether the signup process is currently in progress. It is initially set to false, and will be set to true when the user submits the signup form and the asynchronous signup operation is being processed. This allows the component to provide feedback to the user, such as disabling the signup button and showing a loading indicator while the request is being processed, improving the user experience during the signup process.

  const handleSignup = async () => {  // Define an asynchronous function called handleSignup that will be responsible for handling the signup process when the user submits their information. This function first checks if all required fields (name, email, and password) are filled out, and if not, it shows an alert to the user indicating that all fields are required. If the form is valid, it sets the loading state to true and calls the signup function from Firebase Authentication with the form values. If the signup is successful, it navigates to the home screen using router.replace. If an error occurs during the signup process (such as an email already in use), it catches the error and displays an alert to the user indicating that the signup failed. Finally, it sets the loading state back to false regardless of whether the signup was successful or not, allowing the UI to update accordingly.
    if (!form.email || !form.password || !form.name) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true); // Set the loading state to true to indicate that the signup process is in progress. This can be used to disable the signup button and show a loading indicator in the UI, providing feedback to the user that their request is being processed.
      await signup(form.email, form.password, form.name);
      router.replace("/home");
    } catch {
      Alert.alert("Error", "Signup failed");  // If an error occurs during the signup process (such as an email already in use), catch the error and display an alert to the user indicating that the signup failed. This provides feedback to the user about the issue that occurred, allowing them to take corrective action (such as using a different email or checking their input) before attempting to sign up again.
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
