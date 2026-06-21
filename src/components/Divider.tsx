import React, { memo } from 'react';
import { ColorValue, View } from 'react-native';
import { verticalScale } from '@/utils/scaling-utils';
import { StyleSheet } from 'react-native-unistyles';

interface DividerProps {
  bgColor?: ColorValue;
}

const Divider: React.FC<DividerProps> = ({ bgColor }) => {
  return <View style={[styles.container, bgColor && { backgroundColor: bgColor }]} />;
};

export default memo(Divider);

const styles = StyleSheet.create(theme => ({
  container: {
    height: 0.7,
    marginVertical: verticalScale(10),
    backgroundColor: theme.colors.border
  }
}));
