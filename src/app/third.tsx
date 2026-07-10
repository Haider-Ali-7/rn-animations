import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Page from '@/components/Page';

const WORDS = ["What's", 'up', 'react', 'native', 'devs?'];

const Third = () => {
  const translateX = useSharedValue(0);

  const scrollHanlder = useAnimatedScrollHandler(e => {
    translateX.value = e.contentOffset.x;
  });

  return (
    <SafeAreaView style={styles.container} edges={['']}>
      <Animated.ScrollView onScroll={scrollHanlder} scrollEventThrottle={16} horizontal pagingEnabled>
        {WORDS.map((word, index) => (
          <Page key={index} title={word} index={index} translateX={translateX} />
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Third;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
