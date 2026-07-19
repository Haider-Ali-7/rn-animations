import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface SquareProps {
  ind: number;
  progress: SharedValue<number>;
}

const N = 12;
const SQUARE_SIZE = 12;

const Square: React.FC<SquareProps> = ({ ind, progress }) => {
  const offsetAngle = (2 * Math.PI) / N;
  const finalAngle = offsetAngle * (N - 1 - ind);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }

    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return progress.value;
  }, []);

  const springOutward = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }

    if (progress.value > 2 * Math.PI) {
      return withTiming((ind - N) * SQUARE_SIZE);
    }

    return withTiming(-ind * SQUARE_SIZE);
  });

  const rBoxStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}rad` }, { translateY: springOutward.value }]
    };
  });

  return <Animated.View key={ind} style={[styles.container, rBoxStyle]} />;
};

export default Square;

const styles = StyleSheet.create({
  container: {
    height: SQUARE_SIZE,
    aspectRatio: 1,
    backgroundColor: 'white',
    position: 'absolute'
  }
});
