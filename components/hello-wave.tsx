import Animated from 'react-native-reanimated'; // Import the Animated module from react-native-reanimated, which provides components and hooks for creating animations in React Native. This will be used to create the waving animation for the emoji in the HelloWave component.

export function HelloWave() {   // Define the HelloWave component, which will display a waving hand emoji with an animation
  return (      
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },  // Define the keyframes for the waving animation, where at 50% of the animation duration, the emoji will be rotated by 25 degrees
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}
