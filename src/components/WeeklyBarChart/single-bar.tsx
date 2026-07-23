import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export type Day = {
  day: Date;
  value: number;
};

interface SingleBarProps {
  maxHeight: number;
  width: number;
  day: Day;
}

const SingleBar: React.FC<SingleBarProps> = ({ maxHeight, width, day }) => {
  const rBarStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(maxHeight * day.value),
      opacity: withTiming(day.value)
    };
  }, [maxHeight, day.value]);

  return (
    <View>
      <Animated.View style={[{ width: width, backgroundColor: 'white', borderRadius: 12 }, rBarStyle]} />;
      <Text style={styles.day}>{format(day.day, 'eeeee')}</Text>
    </View>
  );
};

export default SingleBar;

const styles = StyleSheet.create({
  day: { color: '#fff', fontSize: 12, textAlign: 'center', textTransform: 'lowercase', marginTop: 5 }
});
