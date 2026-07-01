import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { W_WIDTH } from '@/utils/platforms-utils';

const SIZE = W_WIDTH * 0.7;

interface PageProps {
  title: string;
  index: number;
  translateX: SharedValue<number>;
}

const Page1: React.FC<PageProps> = ({ title, index, translateX }) => {
  const pageOffset = W_WIDTH * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateX.value + pageOffset) }]
    };
  });

  return (
    <Animated.View style={[styles.pageContainer, { backgroundColor: `rgba(0,0,256,0.${index + 2})` }, rStyle]}>
      <Animated.View style={[styles.square]}>
        <Animated.Text style={styles.text}>{title}</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default React.memo(Page1);

const styles = StyleSheet.create({
  pageContainer: {
    ...StyleSheet.absoluteFillObject,
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
