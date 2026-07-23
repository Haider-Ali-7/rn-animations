import React from 'react';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface DotProps {
  index: number;
  size: number;
  activeIndex: SharedValue<number>;
}

const Dot: React.FC<DotProps> = ({ index, size, activeIndex }) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isDotActive = index <= activeIndex.value;
    return {
      opacity: withTiming(isDotActive ? 1 : 0.3, { duration: 250 })
    };
  }, []);

  return (
    <Animated.View
      style={[{ width: size, height: size, backgroundColor: '#fff', borderRadius: size / 2 }, rDotStyle]}
    />
  );
};

export default Dot;
