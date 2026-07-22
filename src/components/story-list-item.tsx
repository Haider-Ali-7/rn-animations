import { Image } from 'expo-image';
import React from 'react';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { W_WIDTH } from '@/utils/platforms-utils';

export const width = W_WIDTH * 0.8;
export const height = (width / 3) * 4;

interface StoryListItemProps {
  index: number;
  imageSrc: string;
  scrollOffset: SharedValue<number>;
}

const StoryListItem: React.FC<StoryListItemProps> = ({ imageSrc, index, scrollOffset }) => {
  const paddingLeft = (W_WIDTH - width) / 4;

  const rContainerStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / width;

    const translateX = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [120, 60, 0, -width - paddingLeft],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [0.8, 0.9, 1, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX: scrollOffset.value + translateX }, { scale }]
    };
  });

  return (
    <Animated.View style={[{ zIndex: -index, left: paddingLeft }, rContainerStyle]}>
      <Image
        source={{ uri: imageSrc }}
        style={{ width: width, height: height, position: 'absolute', borderRadius: 14 }}
      />
    </Animated.View>
  );
};

export default React.memo(StoryListItem);
