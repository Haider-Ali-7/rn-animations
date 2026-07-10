import Button from '@/components/Button';
import { W_HEIGHT, W_WIDTH } from '@/utils/platforms-utils';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const BG_COLOR = '#444B6F';
const BG_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Ninth = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value)
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onPress = useCallback(() => {
    progress.value = withTiming(1, { duration: 2000 }, () => {
      progress.value = 0;
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.progressText}>{progressText.value}</Animated.Text>
      <Svg style={{ position: 'absolute' }}>
        <Circle cx={W_WIDTH / 2} cy={W_HEIGHT / 2} stroke={BG_STROKE_COLOR} strokeWidth={30} r={R} />
        <AnimatedCircle
          cx={W_WIDTH / 2}
          cy={W_HEIGHT / 2}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          r={R}
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH * 0.5}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>

      <Button title="Run" onPress={onPress} btnStyle={styles.btnStyle} />
    </View>
  );
};

export default Ninth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressText: {
    zIndex: 1,
    fontSize: 80,
    color: 'white'
  },
  btnStyle: {
    position: 'absolute',
    backgroundColor: BG_STROKE_COLOR,
    bottom: 80
  }
});
