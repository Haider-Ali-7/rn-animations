import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import ColorPicker from '@/components/ColorPicker';
import { W_WIDTH } from '@/utils/platforms-utils';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const CIRCLE_SIZE = W_WIDTH * 0.8;
const BG_COLOR = 'rgba(0, 0, 0, 0.9)';
const COLORS = ['red', 'purple', 'blue', 'cyan', 'green', 'yellow', 'orange', 'black', 'white'];

const Eight = () => {
  const pickerColor = useSharedValue<string>(COLORS[0]);

  const onColorChange = useCallback((color: string) => {
    'worklet';

    pickerColor.value = color;
  }, []);

  const rCircleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickerColor.value
    };
  });

  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          onColorChange={onColorChange}
        />
      </View>
    </>
  );
};

export default Eight;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: BG_COLOR,
    justifyContent: 'center'
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2
  },
  gradient: {
    height: 40,
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center'
  }
});
