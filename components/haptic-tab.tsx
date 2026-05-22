import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'; // Import the type for the props of the bottom tab bar button from react-navigation, which will be used to type the props of the HapticTab component
import { PlatformPressable } from '@react-navigation/elements'; // Import the PlatformPressable component from react-navigation, which is a wrapper around the Pressable component that provides platform-specific feedback for touch interactions
import * as Haptics from 'expo-haptics'; // Import the Haptics module from expo-haptics, which provides functions for triggering haptic feedback on supported devices

export function HapticTab(props: BottomTabBarButtonProps) { // Define the HapticTab component, which takes props of type BottomTabBarButtonProps
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
