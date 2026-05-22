import { PropsWithChildren, useState } from 'react'; // Import necessary types and hooks from React. PropsWithChildren is a utility type that allows the component to accept children as props, and useState is a hook for managing state within the component.
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text'; // Import the ThemedText component from the local components directory, which will be used to display the title of the collapsible section with theming support.
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';   // Import the IconSymbol component from the local components directory, which will be used to display an icon (such as a chevron) that indicates whether the collapsible section is expanded or collapsed. The icon will rotate based on the state of the collapsible section, providing a visual cue to users about the current state of the content.
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';   // Import the useColorScheme hook from the local hooks directory, which will be used to determine the current color scheme (light or dark) of the device. This value will be used to apply appropriate colors to the icon in the heading of the collapsible section, ensuring that the UI is visually consistent with the user's theme preferences. If the useColorScheme hook returns null or undefined (which can happen during static rendering on the web), it defaults to 'light' to ensure that there is always a valid theme value available for styling purposes.

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) { // Define the Collapsible component, which is a UI component that can show or hide its children content based on a toggle state. The component accepts a title prop, which is displayed as the heading of the collapsible section, and children, which is the content that will be shown or hidden when the user interacts with the heading. The component uses state to manage whether the content is currently open or closed, and it applies styles to create a visually appealing collapsible section with an icon that indicates whether the section is expanded or collapsed.
  const [isOpen, setIsOpen] = useState(false); // Use the useState hook to create a state variable called isOpen and a corresponding setter function called setIsOpen. This state variable is a boolean that indicates whether the collapsible content is currently open (true) or closed (false). It is initially set to false, meaning that the content will be hidden when the component first renders. The setIsOpen function will be called when the user interacts with the heading of the collapsible section, toggling the value of isOpen and thereby showing or hiding the children content accordingly.
  const theme = useColorScheme() ?? 'light'; // Use the custom useColorScheme hook to determine the current color scheme (light or dark) of the device. This value will be used to apply appropriate colors to the icon in the heading of the collapsible section, ensuring that the UI is visually consistent with the user's theme preferences. If the useColorScheme hook returns null or undefined (which can happen during static rendering on the web), it defaults to 'light' to ensure that there is always a valid theme value available for styling purposes.

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
