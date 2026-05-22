import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';  // Import the SymbolView component and related types from expo-symbols, which will be used to render vector icons in the application. The SymbolView component allows for customizable icons with different weights and colors, making it a versatile choice for displaying icons in the user interface. The IconSymbol component defined below will utilize SymbolView to create a reusable icon component that can be easily styled and used throughout the app.
import { StyleProp, ViewStyle } from 'react-native';  // Import the StyleProp and ViewStyle types from react-native, which will be used to type the style prop of the IconSymbol component. This allows for better type checking and autocompletion when using the IconSymbol component, ensuring that the styles passed to it are valid and compatible with React Native's styling system.

export function IconSymbol({   // Define the IconSymbol component, which is a reusable component for rendering icons using the SymbolView from expo-symbols. This component takes several props: name (the name of the symbol to render), size (the size of the icon, defaulting to 24), color (the color of the icon), style (additional styles to apply to the icon), and weight (the weight of the symbol, defaulting to 'regular'). The component returns a SymbolView with the specified properties, allowing for consistent and customizable icons throughout the application.
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];       // The name prop is required and specifies the name of the symbol to render. It is typed as SymbolViewProps['name'], which means it must be a valid name that the SymbolView component recognizes for rendering an icon.
  size?: number; // The size prop is optional and specifies the size of the icon. It defaults to 24 if not provided, allowing for a standard icon size while still giving the flexibility to customize it as needed.
  color: string;  // The color prop is required and specifies the color of the icon. It is a string that can represent any valid color format (e.g., hex, rgb, rgba), allowing for customization of the icon's appearance to match the app's theme or design requirements.
  style?: StyleProp<ViewStyle>;      // The style prop is optional and allows for additional styles to be applied to the icon. It is typed as StyleProp<ViewStyle>, which means it can accept any valid style object or array of style objects that are compatible with React Native's styling system, providing flexibility in how the icon is styled within different contexts in the app.
  weight?: SymbolWeight;     // The weight prop is optional and specifies the weight of the symbol, which can affect the thickness or boldness of the icon. It defaults to 'regular' if not provided, allowing for a standard appearance while still giving the option to choose different weights (such as 'light', 'medium', 'bold') based on the design needs of the application.
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
