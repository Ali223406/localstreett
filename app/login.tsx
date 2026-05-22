import { auth } from "@/services/firebase-config";  // Import the auth object from the local services directory, which is configured to interact with Firebase Authentication. This object will be used in conjunction with the signInWithEmailAndPassword function to authenticate users when they attempt to log in with their email and password.
import { useRouter } from "expo-router";  // Import the useRouter hook from expo-router, which will be used to programmatically navigate between screens in the application. This hook allows the Login component to navigate to different screens (such as the splash screen or subscribe screen) based on user interactions, such as successful login or clicking on the "Create account" link.
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the signInWithEmailAndPassword function from Firebase Authentication, which will be used to authenticate users when they attempt to log in with their email and password. This function takes the auth object, email, and password as arguments and returns a promise that resolves with the user credentials if the login is successful, or rejects with an error if the login fails.
import { useState } from "react";
import {        // Import necessary components and modules from react-native to build the user interface for the Login screen. This includes components for styling (StyleSheet), displaying text (Text), handling user input (TextInput), creating touchable elements (TouchableOpacity), and structuring the layout (View).
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() { // Define the Login component, which serves as the user interface for the login screen of the application. This component uses state to manage the email and password input values, and includes a function for handling the login process when the user submits their credentials. The component also includes navigation to the subscribe screen for users who do not have an account, and displays a simple form with input fields for email and password, along with a login button.
  const router = useRouter(); // Use the useRouter hook from expo-router to get access to the router object, which allows for programmatic navigation between screens in the application. This is used in the login function to navigate to the splash screen upon successful login, and in the TouchableOpacity component to navigate to the subscribe screen when the user clicks on the "Create account" link.

  const [email, setEmail] = useState("");  // Use the useState hook to create a state variable called email and a corresponding setter function called setEmail. This state variable will hold the value of the email input field in the login form, allowing the component to manage and update the email value as the user types.
  const [password, setPassword] = useState(""); // Use the useState hook to create a state variable called password and a corresponding setter function called setPassword. This state variable will hold the value of the password input field in the login form, allowing the component to manage and update the password value as the user types.

  const login = async () => {    // Define an asynchronous function called login that will be responsible for handling the login process when the user submits their email and password. This function uses a try-catch block to handle the asynchronous operation of signing in with Firebase Authentication. It calls the signInWithEmailAndPassword function with the auth object, email, and password as arguments. If the login is successful, it navigates to the splash screen using router.push. If an error occurs during the login process (such as incorrect credentials), it is caught in the catch block, and an error message is displayed to the user using an alert.
    try {
      await signInWithEmailAndPassword(auth, email, password);  // Call the signInWithEmailAndPassword function from Firebase Authentication, passing in the auth object, email, and password as arguments. This function attempts to authenticate the user with the provided credentials. If the authentication is successful, it resolves with the user credentials; if it fails (e.g., due to incorrect email or password), it rejects with an error.
      router.push("/splash");  // If the login is successful, use the router.push method from expo-router to navigate the user to the "/splash" screen. This allows the application to direct authenticated users to the main content of the app, while unauthenticated users will remain on the login screen or be directed to the subscribe screen if they choose to create an account.
    } catch {
      alert("error");
    }
  };

  return (  // Return the JSX structure for the Login component, which includes a container view with a header section and a card section. The header displays the title and subtitle of the login screen, while the card contains input fields for email and password, a login button, and a link to navigate to the subscribe screen for users who do not have an account. The styles for the components are defined in the StyleSheet at the bottom of the file.
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
