import cstyles from '@/constants/styles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;

const Second = () => {
  // useSharedValue is used in worklet to run on UI thread
  const contextX = useSharedValue(0);
  const translateX = useSharedValue(0);
  const contextY = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(e => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate(e => {
      translateX.value = contextX.value + e.translationX;
      translateY.value = contextY.value + e.translationY;
    })
    .onEnd(() => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 4) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
    };
  }, []);

  return (
    <SafeAreaView style={cstyles.container1}>
      <View style={styles.circle}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[cstyles.box, rStyle]} />
        </GestureDetector>
      </View>
    </SafeAreaView>
  );
};

export default Second;

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_RADIUS * 1.7,
    height: CIRCLE_RADIUS * 1.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0,0,256, 0.5)'
  }
});
