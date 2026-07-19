import { W_WIDTH } from '@/utils/platforms-utils';
import { Feather } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const THRESHOLD = W_WIDTH / 2;

const Twelve = () => {
  const translateX = useSharedValue(0);
  const lastTranslateX = useSharedValue(0);

  const onPan = Gesture.Pan()
    .onStart(() => {
      lastTranslateX.value = translateX.value;
    })
    .onUpdate(e => {
      translateX.value = e.translationX + lastTranslateX.value;
    })
    .onEnd(() => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(W_WIDTH / 2);
      }
    });

  const rViewStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [0, W_WIDTH / 2], [0, 3], Extrapolation.CLAMP);
    const borderRadius = interpolate(translateX.value, [0, W_WIDTH / 2], [0, 15], Extrapolation.CLAMP);

    return {
      borderRadius,
      transform: [{ perspective: 100 }, { translateX: translateX.value }, { rotateY: `-${rotate}deg` }]
    };
  });

  const onMenuPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(W_WIDTH / 2);
    }
  }, []);

  return (
    <View style={styles.container}>
      <GestureDetector gesture={onPan}>
        <Animated.View style={[styles.gestureDetectorContent, rViewStyle]}>
          <Feather name="menu" size={32} color={'black'} onPress={onMenuPress} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Twelve;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
    justifyContent: 'center'
  },
  gestureDetectorContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  }
});
