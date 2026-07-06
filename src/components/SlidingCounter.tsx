import { AntDesign } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const ICON_SIZE = 20;
const BTN_WIDTH = 170;

const clamp = (value: number, min: number, max: number) => {
  'worklet';

  return Math.min(Math.max(value, min), max);
};

const SlidingCounter = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const MAX_SLIDE_OFFSET = BTN_WIDTH * 0.3;

  const [count, setCount] = React.useState(0);

  const increamentCount = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decreamentCount = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const onPan = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = clamp(e.translationX, -MAX_SLIDE_OFFSET, MAX_SLIDE_OFFSET);
      translateY.value = clamp(e.translationY, 0, MAX_SLIDE_OFFSET);
    })
    .onEnd(() => {
      if (translateX.value === MAX_SLIDE_OFFSET) {
        runOnJS(increamentCount)();
      } else if (translateX.value === -MAX_SLIDE_OFFSET) {
        runOnJS(decreamentCount)();
      } else if (translateY.value === MAX_SLIDE_OFFSET) {
        runOnJS(resetCount)();
      }

      translateX.value = withSpring(0, { stiffness: 300 });
      translateY.value = withSpring(0, { stiffness: 300 });
    });

  const rCounterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
    };
  });

  const rPlusMinusStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(translateX.value, [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET], [0.4, 0.8, 0.4]);
    const opacityY = interpolate(translateY.value, [0, MAX_SLIDE_OFFSET], [1, 0]);

    return {
      opacity: opacityX * opacityY
    };
  });

  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, MAX_SLIDE_OFFSET], [0, 0.8]);

    return {
      opacity
    };
  });

  const rBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value * 0.1 }, { translateY: translateY.value * 0.1 }]
    };
  });

  return (
    <Animated.View style={[styles.btn, rBtnStyle]}>
      <Animated.View style={rPlusMinusStyle}>
        <AntDesign name="minus" color="white" size={ICON_SIZE} />
      </Animated.View>

      <Animated.View style={rCloseIconStyle}>
        <AntDesign name="close" color="white" size={ICON_SIZE} />
      </Animated.View>

      <Animated.View style={rPlusMinusStyle}>
        <AntDesign name="plus" color="white" size={ICON_SIZE} />
      </Animated.View>

      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <GestureDetector gesture={onPan}>
          <Animated.View style={[styles.circle, rCounterStyle]}>
            <Text style={styles.countText}>{count}</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </Animated.View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  btn: {
    height: 70,
    width: 170,
    backgroundColor: '#111111',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: '#232323',
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  countText: {
    color: 'white',
    fontSize: 25
  }
});
