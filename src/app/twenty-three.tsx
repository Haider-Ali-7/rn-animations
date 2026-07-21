import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

const TwentyThree = () => {
  const progress = useSharedValue(0);

  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        progress.value = withSpring(1, { mass: 2 });
      }}
      onTouchEnd={() => {
        progress.value = withSpring(0);
      }}>
      {new Array(4).fill(null).map((_, index) => {
        const rStyle = useAnimatedStyle(() => {
          const translateX = interpolate(progress.value, [0, 1], [0, index * 25], Extrapolation.CLAMP);
          const translateY = interpolate(progress.value, [0, 1], [0, -index * 5], Extrapolation.CLAMP);
          const rotate = interpolate(progress.value, [0, 1], [-index * 10, index * 10], Extrapolation.CLAMP);

          return {
            transform: [{ translateX: translateX }, { translateY: translateY }, { rotate: `${rotate}deg` }]
          };
        });

        return <Animated.View key={index} style={[styles.card, rStyle, { zIndex: -index }]} />;
      })}
    </View>
  );
};

export default TwentyThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    position: 'absolute',
    height: 180,
    aspectRatio: 3 / 4,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#b9b9b9'
  }
});
