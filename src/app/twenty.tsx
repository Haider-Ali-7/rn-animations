import SegmentedControl from '@/components/segmented-control';
import { palette } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const options = ['Light', 'Standard', 'Pro'];

const Twenty = () => {
  const [selectedOption, setSelectedOption] = useState('Light');
  const onOptionPress = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <SegmentedControl options={options} selectedOption={selectedOption} onOptionPress={onOptionPress} />
    </View>
  );
};

export default Twenty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
