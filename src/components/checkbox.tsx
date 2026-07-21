import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { palette } from '@/constants/Colors';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onPress }) => {
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      paddingLeft: 20,
      paddingRight: withTiming(checked ? 14 : 20, { duration: 150 }),
      backgroundColor: withTiming(checked ? '#ff63476d' : 'transparent', { duration: 150 }),
      borderColor: withTiming(checked ? palette.active : '#fff')
    };
  }, [checked]);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? palette.active : '#fff', { duration: 150 })
    };
  }, [checked]);

  return (
    <Animated.View
      layout={LinearTransition.springify().mass(0.8)}
      onTouchEnd={onPress}
      style={[styles.container, rContainerStyle]}>
      <Text style={[styles.label, rTextStyle]}>{label}</Text>
      {checked && (
        <Animated.View
          style={{ marginLeft: checked ? 8 : 0 }}
          entering={FadeIn.duration(350)}
          exiting={FadeOut.duration(250)}>
          <AntDesign name="checkcircle" size={22} color={palette.active} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  }
});
