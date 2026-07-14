import { palette } from '@/constants/Colors';
import { W_WIDTH } from '@/utils/platforms-utils';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface SegmentedControlProps {
  options: string[];
  selectedOption: string;
  onOptionPress: (option: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, selectedOption, onOptionPress }) => {
  const internalPadding = 10;
  const segmentedControlWidth = W_WIDTH - 40;
  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

  const rActiveStyle = useAnimatedStyle(() => {
    return {
      left: withSpring(itemWidth * options.indexOf(selectedOption) + internalPadding / 2, {
        velocity: 50,
        stiffness: 200
      })
    };
  }, [selectedOption]);

  return (
    <View style={[styles.container, { width: segmentedControlWidth, paddingLeft: internalPadding / 2 }]}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: itemWidth,
            height: '80%',
            backgroundColor: palette.backgroundColor,
            borderRadius: 14,
            elevation: 3
          },
          rActiveStyle
        ]}
      />
      {options.map(el => (
        <Pressable
          key={el}
          style={{
            width: itemWidth,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          hitSlop={40}
          onPress={() => onOptionPress(el)}>
          <Text style={{ fontSize: 16 }}>{el}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default React.memo(SegmentedControl);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    backgroundColor: palette.baseGrey05,
    justifyContent: 'space-around',
    borderRadius: 18
  }
});
