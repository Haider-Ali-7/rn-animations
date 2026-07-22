import Dots from '@/components/dots';
import { W_HEIGHT, W_WIDTH } from '@/utils/platforms-utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useDerivedValue, useScrollViewOffset } from 'react-native-reanimated';

const DOTS_COUNT = 3;

const TwentySix = () => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  const activeIndex = useDerivedValue(() => {
    return Math.round(scrollOffset.value / W_WIDTH);
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={animatedRef}
        horizontal
        snapToInterval={W_WIDTH}
        scrollEventThrottle={16}
        decelerationRate={'fast'}>
        {new Array(DOTS_COUNT).fill(0).map((_, index) => (
          <View
            key={index}
            style={{ width: W_WIDTH, height: W_HEIGHT, backgroundColor: '#fff', opacity: index * 0.1 }}
          />
        ))}
      </Animated.ScrollView>

      <View style={{ position: 'absolute' }}>
        <Dots count={DOTS_COUNT} activeIndex={activeIndex} />
      </View>
    </View>
  );
};

export default TwentySix;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
