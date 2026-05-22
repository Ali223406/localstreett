import { Href, Link } from 'expo-router';  // Import the Link component from expo-router for navigation and Href type for typing the href prop
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser'; // Import functions from expo-web-browser to open links in an in-app browser on native platforms
import { type ComponentProps } from 'react';    // Import the ComponentProps type from React for typing the props of the ExternalLink component

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string }; // Define a type for the props of the ExternalLink component, which extends the props of the Link component but requires an href prop that is a string and also satisfies the Href type

export function ExternalLink({ href, ...rest }: Props) {  // Define the ExternalLink component, which takes an href prop and any other props that are valid for the Link component
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
