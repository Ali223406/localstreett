/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme'; // Import the Colors object from the local constants directory, which contains color definitions for both light and dark themes. This object will be used in the useThemeColor hook to provide default colors based on the current theme and color scheme when custom colors are not provided through props.
import { useColorScheme } from '@/hooks/use-color-scheme';    // Import the useColorScheme hook from the local hooks directory, which will be used to determine the current color scheme (light or dark) for applying the appropriate colors in the useThemeColor hook. This hook allows components to access the user's preferred color scheme and adjust their styles accordingly for better user experience in both light and dark modes.

export function useThemeColor(        // Define a custom hook called useThemeColor that takes two parameters: props (an object containing optional light and dark color values) and colorName (a string representing the key for the default color in the Colors object). The hook uses the useColorScheme hook to determine the current color scheme (light or dark) and returns the appropriate color based on the provided props or the default colors defined in the Colors object. This allows components to easily access theme-aware colors by using this hook, providing a consistent look and feel across different themes.
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light'; // Use the useColorScheme hook to get the current color scheme (light or dark). If the hook returns null or undefined, default to 'light' as the theme. This ensures that there is always a valid theme value to work with when determining which color to return.
  const colorFromProps = props[theme];

  if (colorFromProps) {  // Check if a color is provided in the props for the current theme. If it is, return that color. This allows components to override the default colors defined in the Colors object by passing custom colors through props, while still falling back to the default colors when custom colors are not provided.
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
