import Square from '@/components/Square';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const Fourteen = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(4 * Math.PI, { duration: 5000, easing: Easing.linear }), -1);
  }, []);

  return (
    <View style={styles.container}>
      {new Array(12).fill(0).map((_, ind) => {
        return <Square key={ind} progress={progress} ind={ind} />;
      })}
    </View>
  );
};

export default Fourteen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
