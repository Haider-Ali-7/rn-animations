import React, { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface PressableScaleProps extends PropsWithChildren {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const PressableScale: React.FC<PressableScaleProps> = ({ onPress, style, children }) => {
  const scale = useSharedValue(1);

  const onTap = Gesture.Tap()
    .maxDuration(10000)
    .onTouchesDown(() => {
      scale.value = withTiming(0.7);
    })
    .onTouchesUp(() => {
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onFinalize(() => {
      scale.value = withTiming(1);
    });

  const rBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  return (
    <GestureDetector gesture={onTap}>
      <Animated.View style={[style, rBtnStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default PressableScale;
