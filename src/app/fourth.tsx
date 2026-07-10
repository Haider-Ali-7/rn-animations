import React, { useState } from 'react';
import { Switch } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { W_WIDTH } from '@/utils/platforms-utils';
import { darkTheme, lightTheme } from '@/utils/unistyles';

type Theme = 'light' | 'dark';

const SIZE = W_WIDTH * 0.7;

const Fourth = () => {
  const { theme } = useUnistyles();
  const [themeMode, setThemeMode] = useState<Theme>('light');

  const progress = useDerivedValue(() => {
    return themeMode === 'light' ? withTiming(0, { duration: 500 }) : withTiming(1, { duration: 500 });
  }, [themeMode]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [lightTheme.colors.bgColor, darkTheme.colors.bgColor]
    );

    return { backgroundColor };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [lightTheme.colors.circle, darkTheme.colors.circle]
    );

    return { backgroundColor };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [0, 1], [lightTheme.colors.text1, darkTheme.colors.text1]);

    return {
      color,
      transform: [{ rotate: withSpring(`${progress.value * 360}deg`) }, { scale: withSpring(progress.value || 1) }]
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>{themeMode}</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={themeMode === 'dark'}
          onValueChange={toggled => setThemeMode(toggled ? 'dark' : 'light')}
          trackColor={{ false: theme.colors.inactiveTint, true: theme.colors.activeTint }}
          thumbColor={theme.colors.btn}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Fourth;

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: theme.colors.circle,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  text: {
    fontSize: 70,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 14,
    marginBottom: 35
  }
}));
