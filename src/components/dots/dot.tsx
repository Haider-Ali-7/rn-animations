import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { DOTS_SIZE } from '.';

interface DotProps {
  index: number;
  activeIndex: SharedValue<number>;
}

const Dot: React.FC<DotProps> = ({ index, activeIndex }) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isDotActive = index <= activeIndex.value;
    return {
      opacity: withTiming(isDotActive ? 1 : 0.3, { duration: 250 })
    };
  }, []);

  return <Animated.View style={[styles.dot, rDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dot: { width: DOTS_SIZE, height: DOTS_SIZE, backgroundColor: '#fff', borderRadius: DOTS_SIZE / 2 }
});
