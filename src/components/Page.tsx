import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { W_HEIGHT, W_WIDTH } from '@/utils/platforms-utils';

const SIZE = W_WIDTH * 0.7;

interface PageProps {
  title: string;
  index: number;
  translateX: SharedValue<number>;
}

const Page: React.FC<PageProps> = ({ title, index, translateX }) => {
  const inputRange = [(index - 1) * W_WIDTH, index * W_WIDTH, (index + 1) * W_WIDTH];
  const outputRange = [W_HEIGHT / 2.5, 0, -W_HEIGHT / 2.5];

  const rSqureStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);
    const borderRadius = interpolate(translateX.value, inputRange, [0, SIZE / 2, 0], Extrapolation.CLAMP);

    return {
      borderRadius,
      transform: [{ scale }]
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, outputRange, Extrapolation.CLAMP);
    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ translateY }]
    };
  });

  return (
    <View style={[styles.pageContainer, { backgroundColor: `rgba(0,0,256,0.${index + 2})` }]}>
      <Animated.View style={[styles.square, rSqureStyle]}>
        <Animated.View style={[rTextStyle]}>
          <Animated.Text style={styles.text}>{title}</Animated.Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default React.memo(Page);

const styles = StyleSheet.create({
  pageContainer: {
    height: W_HEIGHT,
    width: W_WIDTH,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: `rgba(0, 0, 256, 0.4)`,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '600'
  }
});
