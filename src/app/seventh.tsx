import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useDerivedValue, useSharedValue, withDecay } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import Page1 from '@/components/Page1';
import { W_WIDTH } from '@/utils/platforms-utils';

const WORDS = ["What's", 'up', 'react', 'native', 'devs?'];
const MAX_TRANSLATE_X = -W_WIDTH * (WORDS.length - 1);

const Seventh = () => {
  const translateX = useSharedValue(0);
  const context = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = clampedTranslateX.value;
      cancelAnimation(translateX);
    })
    .onUpdate(e => {
      translateX.value = e.translationX + context.value;
    })
    .onEnd(e => {
      translateX.value = withDecay({ velocity: e.velocityX });
    });

  return (
    <SafeAreaView style={styles.container} edges={['']}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={styles.row}>
          {WORDS.map((word, index) => (
            <Page1 key={index} title={word} index={index} translateX={clampedTranslateX} />
          ))}
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default Seventh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  }
});
