import { StyleSheet, Text, type TextProps } from 'react-native'; // Import the StyleSheet and Text components from react-native, as well as the TextProps type for typing the props of the ThemedText component

import { useThemeColor } from '@/hooks/use-theme-color';   // Import the useThemeColor hook from the local hooks directory, which will be used to get the appropriate text color based on the current theme and color scheme for the ThemedText component

export type ThemedTextProps = TextProps & {    // Define a type for the props of the ThemedText component, which extends the TextProps from react-native and includes additional props for lightColor, darkColor, and type. The lightColor and darkColor props allow the user to specify custom text colors for light and dark themes, while the type prop allows the user to specify different text styles (default, title, defaultSemiBold, subtitle, link) that will apply predefined styles to the text.
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({           // Define the ThemedText component, which takes props of type ThemedTextProps. The component uses the useThemeColor hook to determine the appropriate text color based on the current theme and color scheme, and applies different styles based on the type prop. The text is rendered using the Text component from react-native, and any additional props passed to ThemedText are spread onto the Text component.
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');    // Use the useThemeColor hook to get the appropriate text color based on the current theme and color scheme. The lightColor and darkColor props are passed to the hook, along with a default color key of 'text' that will be used if the custom colors are not provided.

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,  // Apply the defaultSemiBold style if the type prop is set to 'defaultSemiBold', which will make the text slightly bolder than the default style.
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({     // Define styles for the ThemedText component using StyleSheet.create. Each style corresponds to a different type of text (default, title, defaultSemiBold, subtitle, link) and sets properties such as fontSize, lineHeight, fontWeight, and color to achieve the desired appearance for each type of text.
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
