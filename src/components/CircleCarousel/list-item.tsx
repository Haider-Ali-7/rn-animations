import { W_WIDTH } from '@/utils/platforms-utils';
import { Image, ImageProps } from 'expo-image';
import React from 'react';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type CircleCarouselListItemProps = {
  imageSrc: ImageProps['source'];
  index: number;
  contentOffset: SharedValue<number>;
};

export const ListItemWidth = W_WIDTH / 4;

const CircleCarouselListItem: React.FC<CircleCarouselListItemProps> = ({ imageSrc, index, contentOffset }) => {
  const inputRange = [
    (index - 2) * ListItemWidth,
    (index - 1) * ListItemWidth,
    index * ListItemWidth,
    (index + 1) * ListItemWidth,
    (index + 2) * ListItemWidth
  ];

  const translateYOutputRange = [0, -ListItemWidth / 3, -ListItemWidth / 2, -ListItemWidth / 3, 0];
  const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];
  const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

  const rViewStyle = useAnimatedStyle(() => {
    const translateY = interpolate(contentOffset.value, inputRange, translateYOutputRange, Extrapolation.CLAMP);
    const opacity = interpolate(contentOffset.value, inputRange, opacityOutputRange, Extrapolation.CLAMP);
    const scale = interpolate(contentOffset.value, inputRange, scaleOutputRange, Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ translateY: translateY }, { translateX: ListItemWidth }, { scale }]
    };
  }, []);

  return (
    <Animated.View
      style={[
        { borderRadius: 100, width: ListItemWidth, aspectRatio: 1, overflow: 'hidden', margin: 3, elevation: 7 },
        rViewStyle
      ]}>
      <Image source={imageSrc} style={{ flex: 1 }} />
    </Animated.View>
  );
};

export default CircleCarouselListItem;
