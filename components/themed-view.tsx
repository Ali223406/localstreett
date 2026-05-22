import { View, type ViewProps } from 'react-native';   // Import the View component and the ViewProps type from react-native, which will be used to create the ThemedView component and type its props

import { useThemeColor } from '@/hooks/use-theme-color';    // Import the useThemeColor hook from the local hooks directory, which will be used to get the appropriate background color based on the current theme and color scheme for the ThemedView component

export type ThemedViewProps = ViewProps & {  // Define a type for the props of the ThemedView component, which extends the ViewProps from react-native and includes additional props for lightColor and darkColor. The lightColor and darkColor props allow the user to specify custom background colors for light and dark themes, which will be used by the useThemeColor hook to determine the appropriate background color based on the current theme and color scheme.
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {  // Define the ThemedView component, which takes props of type ThemedViewProps. The component uses the useThemeColor hook to determine the appropriate background color based on the current theme and color scheme, and renders a View component with the calculated background color and any additional styles or props passed to it.
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;  // Render a View component with a style that includes the calculated background color and any additional styles passed through the style prop. The otherProps are spread onto the View component, allowing any additional props to be passed through to the underlying View.
}
