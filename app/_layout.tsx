import {   // Import necessary modules and components from various libraries to set up the root layout of the application. This includes theme management from react-navigation, stack navigation from expo-router, authentication state management from Firebase, and a custom hook for determining the color scheme.
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router"; // Import the Stack component and useRouter hook from expo-router, which will be used to define the navigation structure of the application and programmatically navigate between screens based on the user's authentication state.
import { onAuthStateChanged } from "firebase/auth";   // Import the onAuthStateChanged function from Firebase Authentication, which will be used to listen for changes in the user's authentication state. This function allows the application to react to changes in authentication status (such as logging in or out) and update the UI accordingly by navigating to different screens based on whether the user is authenticated or not.
import "react-native-reanimated";
import auth from "../services/firebase-auth";       // Import the auth object from the local services directory, which is configured to interact with Firebase Authentication. This object will be used in conjunction with the onAuthStateChanged function to listen for changes in the user's authentication state and manage navigation based on whether the user is logged in or not.

import { useColorScheme } from "@/hooks/use-color-scheme";  // Import the useColorScheme hook from the local hooks directory, which will be used to determine the current color scheme (light or dark) for applying the appropriate theme to the application. This hook allows the application to adapt its appearance based on the user's preferred color scheme, providing a better user experience in both light and dark modes.
import { useEffect, useState } from "react";

export default function RootLayout() {    // Define the RootLayout component, which serves as the main layout for the application. This component uses the useColorScheme hook to determine the current color scheme and applies the appropriate theme (DarkTheme or DefaultTheme) from react-navigation. It also sets up a listener for authentication state changes using Firebase Authentication, and navigates to different screens based on whether the user is authenticated or not. The Stack component from expo-router is used to define the navigation structure of the application, with different screens for tabs, home, splash, login, subscribe, and a modal.
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {              // Use the useEffect hook to set up a listener for authentication state changes when the component mounts. The onAuthStateChanged function from Firebase Authentication is used to listen for changes in the user's authentication state. When the authentication state changes, the callback function is executed, which updates the user state and navigates to different screens based on whether the user is authenticated or not. If the user is authenticated, it navigates to the "home" screen; if not, it navigates to the "login" screen. The onAuthStateChanged function returns an unsubscribe function that is called when the component unmounts to clean up the listener and prevent memory leaks.
    const unsub = onAuthStateChanged(auth, (user_) => {
      console.log("auth state:", user_);

      setUser(user_);

      if (user_) {    // Check if the user is authenticated (i.e., if the user object is not null). If the user is authenticated, navigate to the "home" screen using the router.replace method from expo-router. This allows the application to direct authenticated users to the main content of the app, while unauthenticated users will be directed to the login screen.
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    });

    return unsub; // Return the unsubscribe function from the onAuthStateChanged listener to clean up the listener when the component unmounts. This prevents memory leaks and ensures that the listener is properly removed when it is no longer needed, such as when the user navigates away from the app or when the component is unmounted for any reason.
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>  
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />

        {/* IMPORTANT: tu n’as PAS signup → tu as subscribe */}
        <Stack.Screen name="subscribe" options={{ headerShown: false }} />

        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
