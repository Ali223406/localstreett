import type { PropsWithChildren, ReactElement } from 'react'; // Import types from React for typing the props of the ParallaxScrollView component, which will accept children and a header image as props
import { StyleSheet } from 'react-native';    // Import the StyleSheet module from react-native for creating styles for the ParallaxScrollView component
import Animated, {        // Import the Animated module and hooks from react-native-reanimated for creating animations in the ParallaxScrollView component
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';   // Import the ThemedView component from the local components directory, which will be used to wrap the content of the ParallaxScrollView and provide theming support
import { useColorScheme } from '@/hooks/use-color-scheme';    // Import the useColorScheme hook from the local hooks directory, which will be used to determine the current color scheme (light or dark) for applying the appropriate background color to the header of the ParallaxScrollView
import { useThemeColor } from '@/hooks/use-theme-color'; // Import the useThemeColor hook from the local hooks directory, which will be used to get the appropriate background color for the content of the ParallaxScrollView based on the current theme and color scheme

const HEADER_HEIGHT = 250; // Define a constant for the height of the header in the ParallaxScrollView, which will be used to calculate the animation for the header image as the user scrolls

type Props = PropsWithChildren<{       // Define a type for the props of the ParallaxScrollView component, which includes children (the content to be displayed below the header) and a headerImage (the image to be displayed in the header) along with a headerBackgroundColor object that contains colors for both dark and light themes
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({   // Define the ParallaxScrollView component, which takes props of type Props
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const backgroundColor = useThemeColor({}, 'background'); // Use the useThemeColor hook to get the appropriate background color for the content of the ParallaxScrollView based on the current theme and color scheme
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();    // Create an animated reference for the ScrollView, which will be used to track the scroll position and apply animations to the header image based on the scroll offset
  const scrollOffset = useScrollOffset(scrollRef);
  const headerAnimatedStyle = useAnimatedStyle(() => {   // Use the useAnimatedStyle hook to create an animated style for the header image, which will apply a parallax effect by translating and scaling the image based on the scroll offset. The translateY and scale values are calculated using the interpolate function, which maps the scroll offset to a range of values for the animation.
    return {      // The translateY value will move the header image up as the user scrolls down, creating a parallax effect. The scale value will make the header image larger when the user scrolls up, giving a zooming effect.
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]  // The translateY value is calculated by interpolating the scroll offset. When the scroll offset is at -HEADER_HEIGHT, the image will be translated up by -HEADER_HEIGHT / 2. When the scroll offset is at 0, there will be no translation. When the scroll offset is at HEADER_HEIGHT, the image will be translated down by HEADER_HEIGHT * 0.75.
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]), // The scale value is calculated by interpolating the scroll offset. When the scroll offset is at -HEADER_HEIGHT, the image will be scaled to 2 times its original size. When the scroll offset is at 0, the image will be at its original size (scale of 1). When the scroll offset is at HEADER_HEIGHT, the image will remain at its original size (scale of 1).
        },
      ],
    };
  });

  return (
    <Animated.ScrollView // Render an Animated.ScrollView component that will contain the header image and the content. The scrollRef is attached to the ScrollView to track the scroll position, and the background color is set based on the current theme. The scrollEventThrottle is set to 16 to ensure that the scroll events are processed at a high frequency for smooth animations.
      ref={scrollRef}
      style={{ backgroundColor, flex: 1 }}
      scrollEventThrottle={16}>
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] }, // The background color of the header is set based on the current color scheme (light or dark) using the headerBackgroundColor prop, which contains colors for both themes.
          headerAnimatedStyle,
        ]}>
        {headerImage}
      </Animated.View>
      <ThemedView style={styles.content}>{children}</ThemedView>   // The content of the ParallaxScrollView is wrapped in a ThemedView component, which provides theming support for the content. The children prop is rendered inside the ThemedView, allowing any content passed to the ParallaxScrollView to be displayed below the header image.
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({ // Define styles for the ParallaxScrollView component using StyleSheet.create. The container style is not used in the component but is defined for potential future use. The header style sets the height and overflow properties for the header image, while the content style sets the flex, padding, gap, and overflow properties for the content area.
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
