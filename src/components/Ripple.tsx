import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface RippleProps extends React.PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
}

const Ripple: React.FC<RippleProps> = ({ style, onTap, children }) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const onTapGesture = Gesture.Tap()
    .onStart(e => {
      centerX.value = e.x;
      centerY.value = e.y;
      opacity.value = 1;
      scale.value = 0;
      scale.value = withTiming(1, { duration: 1500 });
      if (onTap) runOnJS(onTap)();
    })
    .onEnd(() => {
      opacity.value = withTiming(0);
    });

  const rCircleStyle = useAnimatedStyle(() => {
    const width = 200;
    const height = 200;
    const circleRadius = Math.sqrt(width ** 3 + height ** 3);

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: opacity.value,
      transform: [
        { translateX: centerX.value - circleRadius },
        { translateY: centerY.value - circleRadius },
        { scale: scale.value }
      ]
    };
  });

  return (
    <View>
      <GestureDetector gesture={onTapGesture}>
        <Animated.View style={styles.ripple}>
          <View style={styles.ripple}>{children}</View>
          <Animated.View style={rCircleStyle} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Ripple;

const styles = StyleSheet.create({
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});
