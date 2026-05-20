import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import "react-native-reanimated";
import auth from "../services/firebase-auth";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user_) => {
      console.log("auth state:", user_);

      setUser(user_);

      if (user_) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    });

    return unsub;
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
