import React from 'react';
import { Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { W_HEIGHT, W_WIDTH } from '@/utils/platforms-utils';

const imageUri =
  'https://plus.unsplash.com/premium_photo-1755882951388-c9a6512ac991?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Fifth = () => {
  const scale = useSharedValue(1);
  const lastSavedScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = e.scale;
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    })
    .onEnd(e => {
      //   lastSavedScale.value = scale.value;
      scale.value = withTiming(1);
    });

  const rImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -W_WIDTH / 2 },
        { translateY: -W_HEIGHT / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: W_WIDTH / 2 },
        { translateY: W_HEIGHT / 2 }
      ]
    };
  });

  const rFocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }]
    };
  });

  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage style={[styles.img, rImageStyle]} source={{ uri: imageUri }} />
        <Animated.View style={[styles.focalPoint, rFocalPointStyle]} />
      </Animated.View>
    </GestureDetector>
  );
};

export default Fifth;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red'
  }
});
