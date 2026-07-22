import React from 'react';
import { View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { palette } from '@/constants/Colors';
import Dot from './dot';

interface DotsProps {
  count: number;
  activeIndex: SharedValue<number>;
}

export const DOTS_SIZE = 10;
const DOTS_GAP = 20;

const Dots: React.FC<DotsProps> = ({ count, activeIndex }) => {
  const rContainerStyle = useAnimatedStyle(() => {
    const width = DOTS_SIZE * (activeIndex.value + 1) + DOTS_GAP * (activeIndex.value + 1);
    return {
      width: withSpring(width)
    };
  });

  return (
    <View style={{ flexDirection: 'row', gap: DOTS_GAP }}>
      <Animated.View
        style={[
          {
            left: -DOTS_GAP / 2,
            height: DOTS_SIZE * 3,
            top: -DOTS_SIZE,
            borderRadius: DOTS_SIZE * 2,
            borderCurve: 'continuous',
            position: 'absolute',
            backgroundColor: palette.active1
          },
          rContainerStyle
        ]}
      />

      {new Array(count).fill(0).map((_, index) => {
        return <Dot key={index} index={index} activeIndex={activeIndex} size={DOTS_SIZE} />;
      })}
    </View>
  );
};

export default Dots;
