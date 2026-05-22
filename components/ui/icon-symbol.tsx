// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Import the MaterialIcons component from the @expo/vector-icons package, which provides a set of pre-designed icons that can be used in React Native applications. This component will be used as a fallback for rendering icons on Android and web platforms, while the IconSymbol component defined in this file will use native SF Symbols on iOS for optimal performance and appearance.
import { SymbolWeight, SymbolViewProps } from 'expo-symbols'; // Import the SymbolWeight and SymbolViewProps types from expo-symbols, which will be used to type the props of the IconSymbol component. The SymbolWeight type defines the possible weight values for the symbols (such as 'light', 'regular', 'bold'), while the SymbolViewProps type defines the properties that can be passed to the SymbolView component when rendering icons on iOS. These types help ensure that the IconSymbol component receives valid props and provides better type checking and autocompletion when used in the application.
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native'; // Import necessary types from react-native for typing the props of the IconSymbol component. The OpaqueColorValue type is used to allow for both string color values and platform-specific color values (such as those returned by useThemeColor), while the StyleProp and TextStyle types are used to type the style prop of the IconSymbol component, ensuring that it can accept valid style objects that are compatible with React Native's styling system. These imports help improve the type safety and developer experience when using the IconSymbol component in the application.

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({ // Define the IconSymbol component, which is a reusable component for rendering icons in the application. This component uses native SF Symbols on iOS for optimal performance and visual fidelity, and falls back to Material Icons on Android and web platforms. The component takes several props: name (the name of the symbol to render), size (the size of the icon, defaulting to 24), color (the color of the icon), style (additional styles to apply to the icon), and weight (the weight of the symbol, defaulting to 'regular'). The name prop is used to determine which icon to render, and it requires a mapping from SF Symbol names to Material Icon names for non-iOS platforms. The component returns the appropriate icon based on the platform, ensuring a consistent appearance across different devices.
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />; // Render the MaterialIcons component with the specified color, size, and style, and use the MAPPING object to convert the SF Symbol name to the corresponding Material Icon name. This allows for a consistent icon appearance across platforms while still using native SF Symbols on iOS for optimal performance and visual fidelity.
}
