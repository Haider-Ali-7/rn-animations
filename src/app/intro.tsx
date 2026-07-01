import Button from '@/components/Button';
import Spacer from '@/components/Spacer';
import styles from '@/constants/styles';
import { verticalScale } from '@/utils/scaling-utils';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const SIZE = 100;

const handleRotation = (progress: SharedValue<number>) => {
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
};

const Intro = () => {
  // useSharedValue is used in worklet to run on UI thread
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }]
    };
  }, []);

  const handleAnimate = () => {
    if (progress.value == 0.5) {
      progress.value = withRepeat(withSpring(1), 3, true);
      scale.value = withRepeat(withSpring(2), 3, true);
    } else {
      progress.value = withRepeat(withSpring(0.5), 3, true);
      scale.value = withRepeat(withSpring(1), 3, true);
    }
  };

  return (
    <SafeAreaView style={styles.container1}>
      <Animated.View style={[styles.box, rStyle]} />
      <Spacer height={verticalScale(50)} />
      <Button title="Animate" onPress={handleAnimate} />
    </SafeAreaView>
  );
};

export default Intro;
