import { W_WIDTH } from '@/utils/platforms-utils';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

interface ColorPickerProps extends LinearGradientProps {
  colors: string[];
  onColorChange: (color: string) => void;
}

const CIRCLE_PICKER_SIZE = 40;
const INTERNAL_CIRCLE_PICKER_SIZE = 40 / 2;

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onColorChange, start, end, style }) => {
  const scale = useSharedValue(1);
  const contextX = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), W_WIDTH * 0.9 - CIRCLE_PICKER_SIZE);
  }, []);

  const tapGesture = Gesture.Tap().onStart(e => {
    translateX.value = e.absoluteX - CIRCLE_PICKER_SIZE;
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = adjustedTranslateX.value;
      translateY.value = -CIRCLE_PICKER_SIZE;
      scale.value = 1.2;
    })
    .onUpdate(e => {
      translateX.value = e.translationX + contextX.value;
    })
    .onEnd(() => {
      translateY.value = 0;
      scale.value = 1;
    });

  const rPickerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: adjustedTranslateX.value },
      { translateY: withSpring(translateY.value) },
      { scale: withSpring(scale.value) }
    ]
  }));

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const inputRange = colors.map((_, index) => (index / colors.length) * W_WIDTH * 0.9);
    const backgroundColor = interpolateColor(adjustedTranslateX.value, inputRange, colors);
    onColorChange(backgroundColor);
    return { backgroundColor };
  });

  return (
    <GestureDetector gesture={Gesture.Exclusive(panGesture, tapGesture)}>
      <Animated.View style={styles.container}>
        <LinearGradient colors={colors} start={start} end={end} style={style} />
        <Animated.View style={[styles.picker, rPickerStyle]}>
          <Animated.View style={[styles.internalPicker, rInternalPickerStyle]} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  picker: {
    position: 'absolute',
    backgroundColor: 'white',
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    left: CIRCLE_PICKER_SIZE / 2.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  internalPicker: {
    position: 'absolute',
    width: INTERNAL_CIRCLE_PICKER_SIZE,
    height: INTERNAL_CIRCLE_PICKER_SIZE,
    borderRadius: INTERNAL_CIRCLE_PICKER_SIZE / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  }
});
