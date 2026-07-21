import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const TwentyOne = () => {
  const [count, setCount] = useState(0);
  const shakeTranslateX = useSharedValue(0);

  const isShaking = useDerivedValue(() => {
    return shakeTranslateX.value !== 0;
  });

  const shake = useCallback(() => {
    const translationAmount = 10;
    const timingConfig = {
      duration: 80,
      easing: Easing.bezier(0.35, 0.7, 0.5, 0.7)
    };
    shakeTranslateX.value = withSequence(
      withTiming(translationAmount, timingConfig),
      withRepeat(withTiming(-translationAmount, timingConfig), 3, true),
      withSpring(0, { mass: 0.5 })
    );
  }, []);

  const onDecreament = useCallback(() => {
    setCount(prev => {
      if (prev == 0) {
        shake();
        return prev;
      }
      return prev - 1;
    });
  }, []);

  const onIncreament = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const rShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeTranslateX.value }]
    };
  });

  const rErrorStyle = useAnimatedStyle(() => {
    return {
      color: isShaking.value ? 'red' : '#000'
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.heading, rShakeStyle, rErrorStyle]}>{count}</Animated.Text>

      <View style={styles.viewContent}>
        <TouchableOpacity style={styles.btn} onPress={onDecreament}>
          <Text style={styles.btnTitle}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={onIncreament}>
          <Text style={styles.btnTitle}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TwentyOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    height: 64,
    aspectRatio: 1,
    backgroundColor: '#000',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTitle: {
    fontSize: 50,
    color: '#fff'
  },
  heading: {
    fontSize: 90,
    color: '#000',
    fontWeight: 'bold'
  },
  viewContent: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 48,
    right: 48,
    gap: 20
  }
});
