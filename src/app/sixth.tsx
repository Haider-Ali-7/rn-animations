import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { W_WIDTH } from '@/utils/platforms-utils';

const feedImageUri =
  'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const heartImageUri =
  'https://static.vecteezy.com/system/resources/thumbnails/024/513/406/small/y2k-gradient-heart-png.png';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Sixth = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const rHeartStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] };
  });

  const rTextStyle = useAnimatedStyle(() => {
    return { opacity: Math.max(opacity.value, 0) };
  });

  const singleTapGesture = Gesture.Tap().onStart(() => {
    opacity.value = withTiming(0.1, {}, finished => {
      if (finished) opacity.value = withDelay(500, withTiming(1));
    });
  });

  const doubleTapGesture = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      scale.value = withSequence(
        withSpring(0.6, {}, finished => {
          if (finished) scale.value = withDelay(200, withSpring(0, { overshootClamping: true }));
        })
      );
    });

  return (
    <GestureDetector gesture={Gesture.Exclusive(doubleTapGesture, singleTapGesture)}>
      <Animated.View style={styles.container}>
        <ImageBackground style={[styles.img]} source={{ uri: feedImageUri }}>
          <AnimatedImage style={[styles.img, rHeartStyle]} source={{ uri: heartImageUri }} resizeMode="center" />
        </ImageBackground>
        <Animated.Text style={[styles.text, rTextStyle]}>Single Tap!</Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default Sixth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: '100%',
    height: W_WIDTH
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 33
  }
});
