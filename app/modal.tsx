import { Link } from 'expo-router'; // Import the Link component from expo-router, which will be used to create a link that allows users to navigate back to the home screen from the modal screen. This component provides a way to navigate between screens in the application while maintaining the navigation stack and history.
import { StyleSheet } from 'react-native'; // Import the StyleSheet module from react-native, which will be used to create a stylesheet for the ModalScreen component. This allows for defining styles in a structured and efficient way, improving the readability and maintainability of the code.

import { ThemedText } from '@/components/themed-text';  // Import the ThemedText component from the local components directory, which is a custom text component that likely adapts its styles based on the current theme (light or dark mode) of the application. This component will be used to display text in the ModalScreen with consistent theming across the app.
import { ThemedView } from '@/components/themed-view';  // Import the ThemedView component from the local components directory, which is a custom view component that likely adapts its background color and other styles based on the current theme (light or dark mode) of the application. This component will be used as the container for the ModalScreen, ensuring that the background and overall appearance of the modal are consistent with the app's theming.

export default function ModalScreen() {  // Define the ModalScreen component, which serves as the content for a modal screen in the application. This component uses the ThemedView and ThemedText components to create a styled modal that displays a title and a link to navigate back to the home screen. The styles for the container and link are defined in the StyleSheet at the bottom of the file, ensuring that the modal has a consistent appearance with the rest of the app's theme.
  return (    // Return the JSX structure for the ModalScreen component, which includes a ThemedView as the container and a ThemedText component to display the title of the modal. Additionally, there is a Link component that allows users to navigate back to the home screen, styled as a link with the ThemedText component inside it. The styles for the container and link are defined in the StyleSheet at the bottom of the file.
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
