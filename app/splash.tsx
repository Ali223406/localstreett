import { useRouter } from "expo-router";  // Import the useRouter hook from expo-router, which will be used to programmatically navigate between screens in the application. In this case, it will be used to navigate from the splash screen to the home screen after a short delay, providing a smooth transition for users when they launch the app.
import { useEffect } from "react";   // Import the useEffect hook from React, which will be used to perform side effects in the Splash component. Specifically, it will be used to set up a timer that navigates to the home screen after a certain amount of time (e.g., 2 seconds) when the splash screen is displayed. This allows the app to show a loading or welcome screen before directing users to the main content of the app.
import { StyleSheet, Text, View } from "react-native";  // Import necessary components from react-native to build the user interface for the Splash component. This includes components for styling (StyleSheet), displaying text (Text), and structuring the layout (View). These components will be used to create a visually appealing splash screen that welcomes users to the app while it loads or initializes necessary resources before navigating to the home screen. The styles for the container, title, and subtitle are defined in the StyleSheet at the bottom of the file, ensuring a consistent and attractive design for the splash screen.

export default function Splash() {  // Define the Splash component, which serves as the welcome or loading screen for the application. This component uses the useEffect hook to set up a timer that automatically navigates to the home screen after a short delay (e.g., 2 seconds) when the splash screen is displayed. The UI includes a container with a title and subtitle, styled using a StyleSheet to create an engaging and visually appealing splash screen for users when they launch the app. The useRouter hook from expo-router is used to programmatically navigate to the home screen after the timer expires, providing a smooth transition from the splash screen to the main content of the app.
  const router = useRouter();

  useEffect(() => {         // Use the useEffect hook to set up a side effect that runs when the Splash component is mounted. This effect sets a timer using setTimeout that will execute a function after a specified delay (e.g., 2000 milliseconds or 2 seconds). The function uses the router.replace method from expo-router to navigate to the "/home" screen, replacing the current splash screen in the navigation stack. This allows users to see the splash screen for a brief moment before being directed to the main content of the app. The useEffect hook also returns a cleanup function that clears the timer when the component is unmounted, preventing memory leaks and ensuring that the timer does not execute if the user navigates away from the splash screen before the timer expires.
    const timer = setTimeout(() => {
      router.replace("/home");   // After the specified delay, use the router.replace method to navigate to the "/home" screen. This replaces the current splash screen in the navigation stack, allowing users to transition smoothly from the splash screen to the main content of the app after a brief loading period. The delay can be adjusted as needed to provide an optimal user experience, ensuring that users have enough time to see the splash screen while the app initializes necessary resources before navigating to the home screen.
    }, 2000);

    return () => clearTimeout(timer); // Return a cleanup function that clears the timer when the component is unmounted. This prevents the timer from executing if the user navigates away from the splash screen before the timer expires, ensuring that there are no memory leaks or unintended navigation actions occurring after the component has been unmounted. This is a best practice when using timers in React components to ensure that resources are properly managed and that the application behaves predictably.
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
